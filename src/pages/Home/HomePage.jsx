
const Homepage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to Our Website</h1>
        <p>Your go-to place for relationship and marriage advice!</p>
      </header>
      <section style={styles.content}>
        <h2>Get Started</h2>
        <p>Explore articles, tips, and resources to help you build a stronger relationship.</p>
        <button style={styles.button}>Start Exploring</button>
      </section>
      <footer style={styles.footer}>
        <p>&copy; 2025 Our Website</p>
      </footer>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '20px 0',
  },
  content: {
    padding: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  footer: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
    marginTop: '20px',
  },
};

export default Homepage;

