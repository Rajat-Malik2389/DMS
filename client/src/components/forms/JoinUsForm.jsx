import { useState } from "react";
import { defaultJoinUsForm } from "../../data/siteContent";
import { submitForm } from "../../lib/api";
import { renderInputClassNames } from "../../lib/formStyles";
import FormNotice from "../common/FormNotice";

function JoinUsForm({ onClose, onStatusChange }) {
  const [form, setForm] = useState(defaultJoinUsForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await submitForm("/api/forms/join-us", form);
      setStatus({ type: "success", message: result.message });
      onStatusChange?.({ type: "success", message: result.message });
      setForm(defaultJoinUsForm);
      onClose();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
      onStatusChange?.({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8 rounded-[1.75rem] border border-white/15 bg-stone-950/70 p-6 backdrop-blur">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-100">Join Us Form</p>
          <h3 className="mt-2 font-serif text-3xl text-white">Register your interest for the upcoming event.</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white"
        >
          Close
        </button>
      </div>

      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Full Name
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Enter your full name"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Email
          <input
            className={renderInputClassNames(true)}
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="Enter your email"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Phone Number
          <input
            className={renderInputClassNames(true)}
            type="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            placeholder="Enter your phone number"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          City
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
            placeholder="Enter your city"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Interest
          <select
            className={renderInputClassNames(true)}
            value={form.interest}
            onChange={(event) => setForm({ ...form, interest: event.target.value })}
          >
            <option>Singer</option>
            <option>Volunteer</option>
            <option>Sponsor</option>
            <option>Coordinator</option>
            <option>Audience Registration</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100">
          Experience
          <input
            className={renderInputClassNames(true)}
            type="text"
            value={form.experience}
            onChange={(event) => setForm({ ...form, experience: event.target.value })}
            placeholder="Singing, volunteering, sponsorship, etc."
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-100 md:col-span-2">
          Message
          <textarea
            className={`${renderInputClassNames(true)} min-h-32`}
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            placeholder="Tell us why you want to join"
          />
        </label>
        <div className="space-y-4 md:col-span-2">
          <FormNotice status={status} />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Submitting..." : "Submit Join Us Form"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JoinUsForm;
