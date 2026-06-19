import { useEffect, useState } from "react";
import RatingForm from "./components/RatingForm";
import RatingList from "./components/RatingList";

function App() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRatings = async () => {
    try {
      const res = await fetch("/api/ratings");
      if (!res.ok) throw new Error("Unable to load ratings");
      const data = await res.json();
      setRatings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const addRating = (rating) => {
    setRatings((prev) => [rating, ...prev]);
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Ice Cream Ratings</h1>
        <p>Share your favorite flavors and scores.</p>
      </header>

      <main>
        <RatingForm onAddRating={addRating} />

        {loading ? (
          ratings.length > 0 && <p>Loading ratings...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <RatingList ratings={ratings} />
        )}
      </main>
    </div>
  );
}

export default App;
