import os
import django
from django.utils.text import slugify
from django.core.files.base import ContentFile
from django.conf import settings

import sys
from pathlib import Path

# Setup Django environment
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'upmark_curve.settings')
django.setup()

from tinker.models import BlogPost, Product
from guidance.models import ExamCategory, Counselor
from studio.models import Service

def populate_tinker():
    print("Populating Tinker Vault (Blogs)...")
    blogs = [
        {
            "title": "Getting Started with ESP32",
            "content": """The ESP32 is a low-cost, low-power system on a chip microcontrollers with integrated Wi-Fi and dual-mode Bluetooth. The ESP32 series employs a Tensilica Xtensa LX6 microprocessor in both dual-core and single-core variations and includes built-in antenna switches, RF balun, power amplifier, low-noise receive amplifier, filters, and power-management modules.

In this guide, we will walk you through the basics of setting up your first ESP32 project. You'll need an ESP32 development board, a USB cable, and the Arduino IDE installed on your computer.

Step 1: Install the ESP32 Board Manager
Open Arduino IDE, go to File > Preferences, and add the Espressif URL to the "Additional Boards Manager URLs".
Then go to Tools > Board > Boards Manager, search for 'esp32', and install the package.

Step 2: Blink Sketch
Open the Example 'Blink' sketch. Select your board and port, then upload. You should see the onboard LED flashing!

This is just the beginning. The ESP32 is capable of running web servers, connecting to cloud IoT platforms, and much more.""",
            "author": "Tech Team"
        },
        {
            "title": "Top 5 STEM Projects for Beginners",
            "content": """Science, Technology, Engineering, and Mathematics (STEM) education is crucial for the future. Here are 5 simple projects to get started:

1. **Lemon Battery**: Learn about electricity using lemons, copper coins, and zinc nails.
2. **Hydraulic Arm**: Build a robot arm using cardboard and syringes to understand hydraulics.
3. **Solar Oven**: Use a pizza box and aluminum foil to cook s'mores using the sun.
4. **Bridge Building**: Test structural integrity using popsicle sticks.
5. **Simple Motor**: Create a motor using a battery, magnet, and copper wire.

These projects are fun, educational, and require minimal materials.""",
            "author": "Education Team"
        },
        {
            "title": "Understanding Arduino Sensors",
            "content": """Sensors are the eyes and ears of your robotics projects. They allow your microcontroller to perceive the world around it.

Common sensors include:
- **Ultrasonic Sensor (HC-SR04)**: Measures distance using sound waves. Great for obstacle avoidance robots.
- **Temperature & Humidity (DHT11)**: Reads environmental data.
- **Light Dependent Resistor (LDR)**: Detects light intensity.

Connecting these to an Arduino is straightforward. Most have VCC, GND, and Signal pins. By reading the signal pin (analog or digital), you can trigger actions based on the sensor's input.""",
            "author": "Robotics Club"
        }
    ]

    for blog_data in blogs:
        slug = slugify(blog_data['title'])
        if not BlogPost.objects.filter(slug=slug).exists():
            BlogPost.objects.create(
                title=blog_data['title'],
                slug=slug,
                content=blog_data['content'],
                author=blog_data['author']
            )
            print(f"Created blog: {blog_data['title']}")
        else:
            print(f"Blog already exists: {blog_data['title']}")

    print("\nPopulating Tinker Tool (Products)...")
    products = [
        {"name": "Arduino Uno R3 Starter Kit", "description": "Complete starter kit with sensors, wires, and breadboard.", "price": 1200.00, "stock": 50},
        {"name": "ESP32 Development Board", "description": "WiFi + Bluetooth enabled microcontroller for IoT projects.", "price": 550.00, "stock": 100},
        {"name": "Basic Robotics Chassis", "description": "2WD chassis with motors and wheels.", "price": 850.00, "stock": 30},
    ]
    
    for prod in products:
        if not Product.objects.filter(name=prod['name']).exists():
            Product.objects.create(**prod)
            print(f"Created product: {prod['name']}")
        else:
            print(f"Product already exists: {prod['name']}")

def populate_guidance():
    print("\nPopulating Guidance...")
    exams = [
        {"name": "JEE Mains & Advanced", "description": "Entrance exam for engineering colleges in India."},
        {"name": "NEET", "description": "Entrance exam for medical colleges."},
        {"name": "NDA", "description": "National Defence Academy entrance."},
    ]

    for exam_data in exams:
        slug = slugify(exam_data['name'])
        exam, created = ExamCategory.objects.get_or_create(
            name=exam_data['name'],
            defaults={'slug': slug, 'description': exam_data['description']}
        )
        
        if created:
            print(f"Created Exam: {exam.name}")
            # Add a dummy counselor for this exam
            Counselor.objects.create(
                exam=exam,
                name=f"Mentor for {exam.name}",
                achievement="Top Rank Holder",
                bio=f"Expert guidance for {exam.name} aspirants with 5+ years of experience.",
                whatsapp_link="https://wa.me/"
            )
            print(f"Added counselor for {exam.name}")
        else:
            print(f"Exam already exists: {exam.name}")

def populate_studio():
    print("\nPopulating Studio...")
    services = [
        {"title": "Web Development", "description": "Custom websites for small businesses and portfolios.", "icon": "🌐", "price_starts_at": 5000},
        {"title": "Graphic Design", "description": "Logos, posters, and social media posts.", "icon": "🎨", "price_starts_at": 1000},
        {"title": "Video Editing", "description": "Professional editing for YouTube and events.", "icon": "🎬", "price_starts_at": 2000},
    ]

    for service in services:
        if not Service.objects.filter(title=service['title']).exists():
            Service.objects.create(**service)
            print(f"Created Service: {service['title']}")
        else:
            print(f"Service already exists: {service['title']}")

if __name__ == '__main__':
    populate_tinker()
    populate_guidance()
    populate_studio()
    print("\nDone!")
