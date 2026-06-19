import { useState } from "react";

function RatingForm({ onAddRating }) {
  const [flavor, setFlavor] = useState("");
  const [score, setScore] = useState(3);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSaving(true);

    const rating = { flavor: flavor.trim(), score: Number(score), notes: notes.trim() };

    if (!rating.flavor) {
      setError("Flavor is required.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rating),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Could not save rating");
      }
      const saved = await res.json();
      onAddRating(saved);
      setFlavor("");
      setScore(3);
      setNotes("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="card form-card">
      <h2>Rate a flavor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Flavor
            <input value={flavor} onChange={(e) => setFlavor(e.target.value)} placeholder="Chocolate chip" />
          </label>

          <label>
            Score
            <select value={score} onChange={(e) => setScore(e.target.value)}>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Creamy, fruity, etc." />
        </label>

        <button type="submit" disabled={saving || !flavor.trim()}>
          {saving ? "Saving..." : "Submit rating"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}

export default RatingForm;
