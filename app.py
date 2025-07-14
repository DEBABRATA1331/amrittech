import sys
sys.path.append("D:/python-packages")  # Update path as needed

import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import plotly.express as px
from textblob import TextBlob
from fpdf import FPDF
import datetime
import io

st.set_page_config(page_title="Feedback Analyzer", layout="wide")
st.title("📊 IEEE Adaptive Feedback Analyzer")

uploaded_file = st.file_uploader("Upload your Feedback CSV file", type="csv")

if uploaded_file:
    df = pd.read_csv(uploaded_file)

    # 🔍 Detect department/event filters
    filter_cols = [col for col in df.columns if "event" in col.lower() or "dept" in col.lower() or "department" in col.lower()]
    if filter_cols:
        selected_filter_col = st.sidebar.selectbox("Filter by", filter_cols)
        selected_value = st.sidebar.selectbox(f"Select {selected_filter_col}", df[selected_filter_col].dropna().unique())
        df = df[df[selected_filter_col] == selected_value]
        st.sidebar.success(f"Filtering applied: {selected_filter_col} = {selected_value}")
    else:
        st.sidebar.info("No department/event filter detected.")

    st.subheader("📄 Data Preview")
    st.dataframe(df.head())

    # Dynamic detection
    name_col = next((col for col in df.columns if "name" in col.lower()), None)
    feedback_col = next((col for col in df.columns if "feedback" in col.lower()), None)
    score_columns = [col for col in df.columns if any(x in col.lower() for x in ["rating", "score", "/10", "out of 10"])]

    # Sidebar preview
    st.sidebar.header("🧠 Auto-Detected Columns")
    st.sidebar.write(f"🔹 Name Column: `{name_col}`" if name_col else "❌ Name column not found.")
    st.sidebar.write(f"🔹 Feedback Column: `{feedback_col}`" if feedback_col else "❌ Feedback column not found.")
    st.sidebar.write(f"🔹 {len(score_columns)} score columns detected.")

    if not score_columns:
        st.error("No rating/score columns found. Please check your CSV format.")
    else:
        numeric_scores = df[score_columns].apply(pd.to_numeric, errors='coerce')
        total_score_count = numeric_scores.count().sum()
        total_score_sum = numeric_scores.sum().sum()
        avg_score = round(total_score_sum / total_score_count, 2)

        total_respondents = numeric_scores.dropna(how='all').shape[0]
        st.success(f"✅ Total Average Feedback Score: {avg_score} (from {total_respondents} feedback responses)")



        st.subheader("📊 Per Question Average Scores")
        question_avgs = numeric_scores.mean().round(2)
        st.bar_chart(question_avgs)

        if st.checkbox("Show average scores in table"):
            st.dataframe(question_avgs.rename("Average Score"))

        st.subheader("📈 Score Distribution")
        all_scores = numeric_scores.values.flatten()
        valid_scores = [s for s in all_scores if pd.notna(s)]
        hist_values = pd.Series(valid_scores).value_counts().sort_index()
        fig = px.bar(x=hist_values.index, y=hist_values.values,
                     labels={"x": "Score", "y": "Count"},
                     title="Distribution of All Feedback Scores")
        st.plotly_chart(fig, use_container_width=True)

        st.subheader("🧪 Explore Feedback by Score")
        score_range = st.slider("Show reviews with average score above:", 1, 10, 7)
        filtered_df = df[numeric_scores.mean(axis=1) >= score_range]
        if not filtered_df.empty and name_col and feedback_col:
            display_cols = [name_col, feedback_col] + score_columns
            st.dataframe(filtered_df[display_cols])
        else:
            st.info("No entries matched the filter.")

        if name_col and feedback_col:
            st.subheader("💬 Open Feedback Responses")
            feedbacks = df[[name_col, feedback_col]].dropna()

            for _, row in feedbacks.iterrows():
                fb_text = str(row[feedback_col]).strip()
                if fb_text.lower() not in ['.', 'no answer', '']:
                    st.markdown(f"**👤 {row[name_col]}**")
                    st.markdown(f"> {fb_text}")
                    st.markdown("---")

            st.subheader("🧠 Sentiment Analysis")

            def analyze_sentiment(text):
                polarity = TextBlob(str(text)).sentiment.polarity
                if polarity > 0.2:
                    return "Positive"
                elif polarity < -0.2:
                    return "Negative"
                else:
                    return "Neutral"

            feedbacks["Sentiment"] = feedbacks[feedback_col].apply(analyze_sentiment)
            st.dataframe(feedbacks)

            sentiment_counts = feedbacks["Sentiment"].value_counts()
            fig_sent = px.pie(values=sentiment_counts.values, names=sentiment_counts.index,
                              title="Feedback Sentiment Distribution")
            st.plotly_chart(fig_sent)

        # 📤 CSV Export
        st.subheader("📤 Export Report")
        export_df = df.copy()
        export_df["Average Score"] = numeric_scores.mean(axis=1)
        if feedback_col:
            export_df["Sentiment"] = df[feedback_col].apply(analyze_sentiment)
        csv = export_df.to_csv(index=False)
        st.download_button(
            label="📥 Download Full Report as CSV",
            data=csv,
            file_name='ieee_feedback_report.csv',
            mime='text/csv'
        )

        # 📄 PDF Export
        st.subheader("📄 Generate PDF Summary")
        if st.button("🖨 Create PDF Report"):
            pdf = FPDF()
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            pdf.cell(200, 10, txt="IEEE Feedback Summary Report", ln=True, align="C")
            pdf.cell(200, 10, txt=f"Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}", ln=True, align="C")
            pdf.ln(10)

            pdf.set_font("Arial", size=11)
            pdf.cell(200, 10, txt=f"Total Average Score: {avg_score}", ln=True)
            pdf.ln(5)

            pdf.cell(200, 10, txt="Question-wise Averages:", ln=True)
            for q, avg in question_avgs.items():
                pdf.cell(200, 8, txt=f"{q}: {avg}", ln=True)

            pdf.ln(10)
            pdf.cell(200, 10, txt="Feedback Summary:", ln=True)
            for _, row in feedbacks.iterrows():
                fb = str(row[feedback_col])
                if fb and fb.strip().lower() not in ['.', 'no answer', '']:
                    name = str(row[name_col]) if name_col else "Anonymous"
                    pdf.multi_cell(200, 8, txt=f"{name}: {fb}")

            pdf_output = "ieee_feedback_summary.pdf"
            pdf.output(pdf_output)

            with open(pdf_output, "rb") as f:
                st.download_button("⬇️ Download PDF Summary", f, file_name=pdf_output, mime="application/pdf")
