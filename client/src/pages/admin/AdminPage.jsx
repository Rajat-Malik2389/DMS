import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../../components/common/PageShell";
import {
  postAdmin,
  putAdmin,
  deleteAdmin,
  getAdmin,
  clearAdminToken
} from "../../lib/api";
import { renderInputClassNames } from "../../lib/formStyles";
import FormNotice from "../../components/common/FormNotice";

const defaultEvent = {
  title: "",
  description: "",
  eventDate: "",
  eventLocation: "",
  posterImage: "",
  registrationDeadline: "",
  eventType: "Competition",
  liveLink: ""
};

const eventTypes = ["Competition", "Concert", "Workshop"];

function AdminPage() {
  const [form, setForm] = useState(defaultEvent);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [reports, setReports] = useState({ singing: [], ngo: [], all: [] });
  const [loadingReports, setLoadingReports] = useState(false);
  const navigate = useNavigate();

  async function loadEvents() {
    try {
      const data = await getAdmin("/api/admin/events");
      setEvents(data);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  async function loadReports() {
    setLoadingReports(true);
    try {
      const [singing, ngo, all] = await Promise.all([
        getAdmin("/api/admin/reports/singing"),
        getAdmin("/api/admin/reports/ngo"),
        getAdmin("/api/admin/reports/all")
      ]);
      setReports({ singing, ngo, all });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoadingReports(false);
    }
  }

  useEffect(() => {
    loadEvents();
    loadReports();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      if (editingId) {
        await putAdmin(`/api/admin/events/${editingId}`, form);
        setStatus({ type: "success", message: "Event updated successfully." });
      } else {
        await postAdmin("/api/admin/events", form);
        setStatus({ type: "success", message: "Event created successfully." });
      }
      setForm(defaultEvent);
      setEditingId("");
      loadEvents();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(ev) {
    setForm({
      title: ev.title || "",
      description: ev.description || "",
      eventDate: ev.eventDate ? ev.eventDate.slice(0, 10) : "",
      eventLocation: ev.eventLocation || "",
      posterImage: ev.posterImage || "",
      registrationDeadline: ev.registrationDeadline ? ev.registrationDeadline.slice(0, 10) : "",
      eventType: ev.eventType || "Competition"
    });
    setEditingId(ev._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;
    try {
      await deleteAdmin(`/api/admin/events/${id}`);
      setStatus({ type: "success", message: "Event deleted." });
      loadEvents();
      if (editingId === id) {
        setEditingId("");
        setForm(defaultEvent);
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  return (
    <PageShell basePath="/admin">
      <section className="rounded-[2rem] border border-white/40 bg-[#fff8ef] p-8 shadow-[0_24px_80px_rgba(84,42,24,0.14)] md:p-10">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-700">Admin</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="mt-2 font-serif text-4xl text-stone-900">Events Panel</h1>
              <p className="mt-2 text-stone-600">
                Create, edit, or delete events. View singing and NGO reports below.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                clearAdminToken();
                navigate("/admin/login");
              }}
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Log out
            </button>
          </div>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            Event Title
            <input
              className={renderInputClassNames(true)}
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            Event Type
            <select
              className={renderInputClassNames(true)}
              value={form.eventType}
              onChange={(e) => setForm({ ...form, eventType: e.target.value })}
              required
            >
              {eventTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-800 md:col-span-2">
            Event Description
            <textarea
              className={`${renderInputClassNames(true)} min-h-32`}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            Event Date
            <input
              className={renderInputClassNames(true)}
              type="date"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            Registration Deadline
            <input
              className={renderInputClassNames(true)}
              type="date"
              value={form.registrationDeadline}
              onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            Event Location
            <input
              className={renderInputClassNames(true)}
              type="text"
              value={form.eventLocation}
              onChange={(e) => setForm({ ...form, eventLocation: e.target.value })}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            Poster Image URL
            <input
              className={renderInputClassNames(true)}
              type="url"
              value={form.posterImage}
              onChange={(e) => setForm({ ...form, posterImage: e.target.value })}
              placeholder="https://…"
              required
            />
            <input
              className={renderInputClassNames(true)}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  setForm((prev) => ({ ...prev, posterImage: reader.result || prev.posterImage }));
                };
                reader.readAsDataURL(file);
              }}
            />
            <p className="text-xs text-stone-500">Use a URL or upload; upload stores as base64.</p>
          </label>
          <label className="grid gap-2 text-sm font-medium text-stone-800">
            YouTube Live / Stream Link (optional)
            <input
              className={renderInputClassNames(true)}
              type="url"
              value={form.liveLink}
              onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
              placeholder="https://youtube.com/live/..."
            />
          </label>

          <div className="md:col-span-2 space-y-4">
            <FormNotice status={status} />
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Saving..." : editingId ? "Update Event" : "Create Event"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId("");
                    setForm(defaultEvent);
                  }}
                  className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </div>
        </form>

        <div className="mt-8 space-y-3">
          <h2 className="font-serif text-2xl text-stone-900">Events List</h2>
          <div className="overflow-auto rounded-2xl border border-stone-200 bg-white">
            <table className="min-w-full text-sm text-stone-800">
              <thead className="bg-stone-100 text-left">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td className="px-4 py-4 text-center text-stone-500" colSpan={5}>
                      No events yet.
                    </td>
                  </tr>
                ) : (
                  events.map((ev) => (
                    <tr key={ev._id} className="border-t border-stone-100">
                      <td className="px-4 py-3">{ev.title}</td>
                      <td className="px-4 py-3">{ev.eventType}</td>
                      <td className="px-4 py-3">{ev.eventDate?.slice(0, 10)}</td>
                      <td className="px-4 py-3">{ev.eventLocation}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          type="button"
                          onClick={() => startEdit(ev)}
                          className="text-emerald-700 underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(ev._id)}
                          className="text-red-600 underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-serif text-xl text-stone-900">Singing Report</h3>
              <span className="text-xs text-stone-500">{loadingReports ? "Loading…" : `${reports.singing.length} entries`}</span>
            </div>
            <div className="max-h-[320px] overflow-auto">
              <table className="min-w-full text-sm text-stone-800">
                <thead className="bg-stone-100 text-left">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Talent</th>
                    <th className="px-3 py-2">City</th>
                    <th className="px-3 py-2">Video</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.singing.length === 0 ? (
                    <tr>
                      <td className="px-3 py-3 text-center text-stone-500" colSpan={4}>
                        No submissions yet.
                      </td>
                    </tr>
                  ) : (
                    reports.singing.map((item) => (
                      <tr key={item._id} className="border-t border-stone-100">
                        <td className="px-3 py-2">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-xs text-stone-500">{item.email}</div>
                          <div className="text-xs text-stone-500">{item.phone}</div>
                        </td>
                        <td className="px-3 py-2">
                          {item.talentCategory}
                          <div className="text-xs text-stone-500">{item.languagePreference}</div>
                        </td>
                        <td className="px-3 py-2">{item.city}</td>
                        <td className="px-3 py-2">
                          <a className="text-emerald-700 underline" href={item.videoLink} target="_blank" rel="noreferrer">
                            Link
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/90 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-serif text-xl text-stone-900">NGO Report</h3>
              <span className="text-xs text-stone-500">{loadingReports ? "Loading…" : `${reports.ngo.length} entries`}</span>
            </div>
            <div className="max-h-[320px] overflow-auto">
              <table className="min-w-full text-sm text-stone-800">
                <thead className="bg-stone-100 text-left">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">City</th>
                    <th className="px-3 py-2">Help Type</th>
                    <th className="px-3 py-2">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.ngo.length === 0 ? (
                    <tr>
                      <td className="px-3 py-3 text-center text-stone-500" colSpan={4}>
                        No submissions yet.
                      </td>
                    </tr>
                  ) : (
                    reports.ngo.map((item) => (
                      <tr key={item._id} className="border-t border-stone-100">
                        <td className="px-3 py-2">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-xs text-stone-500">{item.email}</div>
                          <div className="text-xs text-stone-500">{item.phone}</div>
                        </td>
                        <td className="px-3 py-2">{item.city}</td>
                        <td className="px-3 py-2">{item.helpType}</td>
                        <td className="px-3 py-2 text-xs text-stone-700">{item.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-serif text-xl text-stone-900">All Submissions</h3>
            <span className="text-xs text-stone-500">
              {loadingReports ? "Loading…" : `${reports.all.length} entries`}
            </span>
          </div>
          <div className="max-h-[360px] overflow-auto">
            <table className="min-w-full text-sm text-stone-800">
              <thead className="bg-stone-100 text-left">
                <tr>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">City</th>
                  <th className="px-3 py-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {reports.all.length === 0 ? (
                  <tr>
                    <td className="px-3 py-3 text-center text-stone-500" colSpan={5}>
                      No submissions yet.
                    </td>
                  </tr>
                ) : (
                  reports.all.map((item) => (
                    <tr key={item._id} className="border-t border-stone-100">
                      <td className="px-3 py-2 uppercase text-xs font-semibold text-stone-600">{item.formType}</td>
                      <td className="px-3 py-2">
                        <div className="font-semibold">{item.name}</div>
                        {item.stageName ? <div className="text-xs text-stone-500">Stage: {item.stageName}</div> : null}
                      </td>
                      <td className="px-3 py-2 text-xs text-stone-700">
                        {item.email}
                        <br />
                        {item.phone}
                      </td>
                      <td className="px-3 py-2">{item.city}</td>
                      <td className="px-3 py-2 text-xs text-stone-600">
                        {item.createdAt ? item.createdAt.slice(0, 10) : ""}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default AdminPage;
