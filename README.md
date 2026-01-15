# 🎓 Student Performance Prediction System

A web-based machine learning system that predicts student academic performance based on educational preparation and support-related factors.

---

## 📌 Project Overview
This system uses a supervised machine learning model trained on a public Kaggle dataset to estimate a student's expected performance level.  
The goal is to demonstrate the application of machine learning, backend APIs, frontend integration, and collaborative software development.

---

## ⚙️ System Architecture
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Python Flask REST API  
- **Machine Learning:** Scikit-learn regression model  
- **Version Control:** GitHub with branch-based collaboration

---

## 🧠 Features Used for Prediction
- Gender  
- Parental level of education  
- Lunch type (as an indicator of nutritional support)  
- Test preparation course  

> Sensitive demographic attributes such as race/ethnicity were intentionally excluded to reduce bias.

---

## 🚀 How It Works
1. User enters student background information via the web interface  
2. Frontend sends data to backend API  
3. Backend processes the input using a trained ML model  
4. The system returns a predicted average score and performance level

---

## ▶️ How to Run (Windows)

1. Install dependencies  
```bash
py -m pip install -r requirements.txt
