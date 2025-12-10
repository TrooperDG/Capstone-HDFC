# Trusted Notifications — Prototype

A simulation-based frontend prototype demonstrating how a **secure, reliable, anti-spoof notification framework** could work in a real banking ecosystem.

This project simulates how banks can deliver messages safely and consistently across **SMS, WhatsApp, Email, and In-App Inbox** with **smart retry**, **fallback**, and **trusted verification**.

**Live Demo (Vercel):** https://capstone-hdfc.vercel.app

**Tech Stack:** React (Vite) + Tailwind CSS — Pure Frontend Simulation  
 Entire logic runs client-side with a custom simulation engine.

---

## 📸 Screenshots

### **Web Page**

![Web Page](/public/webpage.jpg)

### **Admin Dashboard ( Message Event Simulation Panel)**

![Admin Dashboard](/public/admine-side-pannel.jpg)

### **User Dashboard (Phone UI + Error Simulation Panel)**

![User Dashboard](/public/user-side-pannel.jpg)

### **Verification Modal (Trusted Message Details)**

![Verification Modal](/public/verification-popup.jpg)

---

# What This Project Demonstrates

The prototype demonstrates a complete trusted-notification workflow:

### Event-to-channel routing

Different types of events use different delivery channels:

| Event Type          | Routing Path                    |
| ------------------- | ------------------------------- |
| **OTP**             | SMS → WhatsApp → In-App         |
| **Payment**         | In-App → SMS → WhatsApp         |
| **Security Alerts** | WhatsApp → SMS → Email → In-App |
| **Service/Promos**  | Email → In-App                  |

---

### Smart retry + fallback

If a channel fails (e.g., blocked SMS, device offline), the system automatically retries through the next best channel.

### Verified sender identity

Each delivered message receives a mock **digital signature**, displayed in a **Verification Modal**.

### Anti-spoofing

When spoof mode is enabled:

- Signature is removed
- UI shows “⚠ Unverified”
- Verification modal warns the user

### Terminal-style logs

Every retry, fallback, failure, and success is logged in real time.

---

### How to run

In root terminal write :

- npm install
- npm run dev
