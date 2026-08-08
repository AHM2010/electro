import { AtSign, Clock3, Mail, MapPin, MessageSquare, Phone, Send, SquareCheck } from "lucide-react";
import { useState } from "react";

const inputClass = "mt-1.5 block min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500";

export default function Contact() {
  const [status, setStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !email || !message) return setStatus({ type: "error", message: "Please complete every required field." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus({ type: "error", message: "Enter a valid email address so we can reply." });
    setStatus({ type: "success", message: "Thanks — your message is ready to send through your email app." });
    const subject = `New message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:customerservice@electro.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="page-section">
      <div className="site-container">
        <header className="mx-auto mb-10 max-w-2xl text-center"><p className="eyebrow">We’re here to help</p><h1 className="title mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">Let’s solve it together</h1><p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">Questions about a device, delivery, or your order? Send our team a message and we’ll point you in the right direction.</p></header>
        <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          <aside className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300"><MessageSquare className="h-6 w-6" /></span><h2 className="mt-6 text-2xl font-bold">Contact information</h2><p className="mt-2 text-sm leading-6 text-slate-400">Our customer care team typically responds within one business day.</p>
            <div className="mt-8 space-y-5 text-sm"><p className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 text-blue-300" /><span><strong className="block text-white">Email</strong><span className="text-slate-400">customerservice@electro.com</span></span></p><p className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 text-blue-300" /><span><strong className="block text-white">Phone</strong><span className="text-slate-400">+966 11 000 0000</span></span></p><p className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-blue-300" /><span><strong className="block text-white">Visit</strong><span className="text-slate-400">Riyadh, Saudi Arabia</span></span></p><p className="flex items-start gap-3"><Clock3 className="mt-0.5 h-5 w-5 text-blue-300" /><span><strong className="block text-white">Hours</strong><span className="text-slate-400">Sun–Thu, 9:00–18:00</span></span></p></div>
            <a href="https://www.instagram.com" className="mt-10 inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"><AtSign className="h-4 w-4" /> Follow Electro</a>
          </aside>

          <form className="surface-card p-5 sm:p-8" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Name <span className="text-red-500">*</span><input name="name" autoComplete="name" placeholder="Your full name" className={inputClass} onChange={() => setStatus(null)} /></label><label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email <span className="text-red-500">*</span><input type="email" name="email" autoComplete="email" placeholder="you@example.com" className={inputClass} onChange={() => setStatus(null)} /></label></div>
            <label className="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200">How can we help? <span className="text-red-500">*</span><textarea name="message" rows={8} placeholder="Tell us what you need help with…" className={`${inputClass} resize-y`} onChange={() => setStatus(null)} /></label>
            {status && <p role={status.type === "error" ? "alert" : "status"} className={`mt-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${status.type === "error" ? "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300" : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"}`}><SquareCheck className="h-5 w-5 shrink-0" />{status.message}</p>}
            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">Send message <Send className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
