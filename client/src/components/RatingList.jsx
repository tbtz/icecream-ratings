function RatingList({ ratings }) {
  if (ratings.length === 0) {
    return (
      <section className="card list-card">
        <h2>Recent Ratings</h2>
        <p className="empty-state">No ratings yet. Be the first to add one!</p>
      </section>
    );
  }

  return (
    <section className="card list-card">
      <h2>Recent Ratings</h2>
      <ul>
        {ratings.map((rating) => (
          <li key={rating._id} className="rating-item">
            <div className="rating-item-left">
              <span className="rating-score-badge">{rating.score}</span>
              <div className="rating-info">
                <strong>{rating.flavor}</strong>
                {rating.notes && <p className="rating-notes">{rating.notes}</p>}
              </div>
            </div>
            <span className="rating-date">{new Date(rating.createdAt).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RatingList;
