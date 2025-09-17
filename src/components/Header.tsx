const Header = () => {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border"
      style={{
        background: 'var(--gradient-header)',
        boxShadow: 'var(--shadow-header)'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          📰 RAG News Chatbot
        </h1>
      </div>
    </header>
  );
};

export default Header;