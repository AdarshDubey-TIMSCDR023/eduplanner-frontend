// App.jsx
import { useEffect, useState } from "react";
import { getTasks } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Cannot connect backend");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = () => {
    if (filter === "completed") {
      return tasks.filter((t) => t.status === "Completed");
    }
    if (filter === "active") {
      return tasks.filter((t) => t.status !== "Completed");
    }
    return tasks;
  };

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => t.status !== "Completed").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
  };

  // Helper for stats card styling
  const getStatCardStyle = (gradientColor) => ({
    background: "linear-gradient(135deg, #ffffff, #f8fafc)",
    padding: "clamp(18px, 4vw, 28px) clamp(15px, 3vw, 25px)",
    borderRadius: "clamp(20px, 4vw, 28px)",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid rgba(203, 213, 225, 0.4)",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  });

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
    e.currentTarget.style.borderColor = "#b9d0f0";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.06)";
    e.currentTarget.style.borderColor = "rgba(203, 213, 225, 0.4)";
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.98)",
        transition: "all 0.3s ease",
        position: "relative",
        zIndex: 1,
        padding: "clamp(20px, 5vw, 40px)",
        boxSizing: "border-box",
      }}
    >
      {/* Enhanced Animated Background elements */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        {/* Floating orbs with smooth animations */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0) 70%)",
          borderRadius: "50%",
          animation: "float 20s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0) 70%)",
          borderRadius: "50%",
          animation: "float 25s ease-in-out infinite reverse",
        }} />
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, rgba(34,197,94,0) 70%)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulse 15s ease-in-out infinite",
        }} />
        
        {/* New: Moving gradient lines */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background: "repeating-linear-gradient(45deg, rgba(37,99,235,0.02) 0px, rgba(37,99,235,0.02) 2px, transparent 2px, transparent 8px)",
          animation: "slideBg 30s linear infinite",
        }} />
        
        {/* New: Slow drifting particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 255, 0.3)`,
              borderRadius: "50%",
              animation: `drift ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        
        {/* New: Rotating geometric shapes */}
        <div style={{
          position: "absolute",
          top: "15%",
          right: "15%",
          width: "120px",
          height: "120px",
          border: "1px solid rgba(37,99,235,0.1)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          animation: "morph 18s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: "180px",
          height: "180px",
          border: "1px solid rgba(139,92,246,0.08)",
          borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
          animation: "morph 22s ease-in-out infinite reverse",
        }} />
        
        {/* New: Subtle glow overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%)",
          pointerEvents: "none",
        }} />
      </div>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "clamp(5px, 2vw, 8px)",
          fontSize: "clamp(2rem, 7vw, 3.5rem)",
          fontWeight: "800",
          background: "linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6, #60a5fa, #8b5cf6)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          letterSpacing: "-0.02em",
          animation: "fadeInDown 0.6s ease",
          textShadow: "0 2px 10px rgba(37,99,235,0.1)",
        }}
      >
        EduPlanner 
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#64748b",
          marginTop: "-5px",
          marginBottom: "clamp(25px, 6vw, 45px)",
          fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
          fontWeight: "500",
          animation: "fadeInUp 0.6s ease",
          background: "linear-gradient(135deg, #64748b, #94a3b8)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Organize your learning journey   
      </p>

      <TaskForm refresh={loadTasks} />

      <div
        className="stats"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
          gap: "clamp(15px, 3vw, 25px)",
          marginBottom: "clamp(30px, 6vw, 50px)",
        }}
      >
        {/* Total Tasks Card */}
        <div
          className="card"
          style={getStatCardStyle()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
              marginBottom: "8px",
              color: "#2563eb",
            }}
          >
          </div>
          <h2
            style={{
              margin: "clamp(8px, 2vw, 12px) 0",
              fontSize: "clamp(2rem, 5.5vw, 2.8rem)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #1e293b, #2563eb)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {stats.total}
          </h2>
          <p
            style={{
              color: "#64748b",
              fontWeight: "600",
              fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Total Tasks
          </p>
        </div>

        {/* Active Tasks Card */}
        <div
          className="card"
          style={getStatCardStyle()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
              marginBottom: "8px",
              color: "#f59e0b",
            }}
          >
          </div>
          <h2
            style={{
              margin: "clamp(8px, 2vw, 12px) 0",
              fontSize: "clamp(2rem, 5.5vw, 2.8rem)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #1e293b, #f59e0b)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {stats.active}
          </h2>
          <p
            style={{
              color: "#64748b",
              fontWeight: "600",
              fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Active
          </p>
        </div>

        {/* Completed Tasks Card */}
        <div
          className="card"
          style={getStatCardStyle()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
              marginBottom: "8px",
              color: "#22c55e",
            }}
          >
          </div>
          <h2
            style={{
              margin: "clamp(8px, 2vw, 12px) 0",
              fontSize: "clamp(2rem, 5.5vw, 2.8rem)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #1e293b, #22c55e)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {stats.completed}
          </h2>
          <p
            style={{
              color: "#64748b",
              fontWeight: "600",
              fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Completed
          </p>
        </div>
      </div>

      <div
        className="filters"
        style={{
          display: "flex",
          gap: "clamp(10px, 2.5vw, 16px)",
          marginBottom: "clamp(25px, 5vw, 40px)",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{
            background:
              filter === "all"
                ? "linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)"
                : "rgba(255, 255, 255, 0.8)",
            color: filter === "all" ? "white" : "#475569",
            boxShadow:
              filter === "all" ? "0 8px 20px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)" : "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
            padding: "clamp(10px, 2.5vw, 14px) clamp(24px, 4.5vw, 38px)",
            fontWeight: "600",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "60px",
            border: "none",
            cursor: "pointer",
            backdropFilter: filter === "all" ? "none" : "blur(10px)",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            if (filter !== "all") {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (filter !== "all") {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }
          }}
        >
          All Tasks
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            background:
              filter === "active"
                ? "linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)"
                : "rgba(255, 255, 255, 0.8)",
            color: filter === "active" ? "white" : "#475569",
            boxShadow:
              filter === "active" ? "0 8px 20px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)" : "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
            padding: "clamp(10px, 2.5vw, 14px) clamp(24px, 4.5vw, 38px)",
            fontWeight: "600",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "60px",
            border: "none",
            cursor: "pointer",
            backdropFilter: filter === "active" ? "none" : "blur(10px)",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            if (filter !== "active") {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (filter !== "active") {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }
          }}
        >
          Active Tasks
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            background:
              filter === "completed"
                ? "linear-gradient(135deg, #22c55e, #16a34a, #15803d)"
                : "rgba(255, 255, 255, 0.8)",
            color: filter === "completed" ? "white" : "#475569",
            boxShadow:
              filter === "completed"
                ? "0 8px 20px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                : "0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
            padding: "clamp(10px, 2.5vw, 14px) clamp(24px, 4.5vw, 38px)",
            fontWeight: "600",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "60px",
            border: "none",
            cursor: "pointer",
            backdropFilter: filter === "completed" ? "none" : "blur(10px)",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => {
            if (filter !== "completed") {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (filter !== "completed") {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            }
          }}
        >
          Completed Tasks
        </button>
      </div>

      {loading ? (
        <div
          className="loading-state"
          style={{
            textAlign: "center",
            padding: "clamp(40px, 10vw, 60px)",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: "32px",
            color: "#2563eb",
            fontWeight: "600",
            fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            border: "1px solid rgba(203, 213, 225, 0.3)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              width: "clamp(35px, 6vw, 50px)",
              height: "clamp(35px, 6vw, 50px)",
              border: "4px solid #e2e8f0",
              borderTopColor: "#2563eb",
              borderRightColor: "#60a5fa",
              borderRadius: "50%",
              animation: "spin 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
              marginRight: "15px",
              verticalAlign: "middle",
            }}
          ></div>
          Loading your tasks...
        </div>
      ) : (
        <TaskList tasks={filteredTasks()} refresh={loadTasks} />
      )}

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
        }
        
        @keyframes slideBg {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        
        @keyframes drift {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        
        @keyframes morph {
          0% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: rotate(0deg);
          }
          50% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            transform: rotate(5deg);
          }
          100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: rotate(0deg);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .stats {
            gap: 12px;
          }
          
          .container {
            padding: 20px !important;
          }
        }
        
        @media (max-width: 640px) {
          .filters button {
            flex: 1;
            min-width: 110px;
            text-align: center;
            padding: 10px 18px !important;
            font-size: 0.85rem !important;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .container {
            background: rgba(15, 23, 42, 0.95) !important;
          }
          
          .card {
            background: #1e293b !important;
            border-color: #334155 !important;
          }
          
          .card p {
            color: #94a3b8 !important;
          }
          
          .filters button {
            background: rgba(30, 41, 59, 0.8) !important;
            color: #cbd5e1 !important;
            backdropFilter: blur(10px);
          }
          
          .loading-state {
            background: rgba(30, 41, 59, 0.8) !important;
            color: #60a5fa !important;
            backdropFilter: blur(10px);
          }
          
          h1, h2 {
            background: linear-gradient(135deg, #60a5fa, #3b82f6, #8b5cf6) !important;
            backgroundClip: text !important;
            WebkitBackgroundClip: text !important;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Better touch targets for mobile */
        @media (max-width: 768px) {
          button, 
          .card,
          [role="button"] {
            min-height: 48px;
          }
          
          .filters button {
            padding: 12px 20px !important;
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Improved focus states for accessibility */
        button:focus-visible {
          outline: 3px solid #2563eb;
          outline-offset: 3px;
          transform: scale(1.02);
        }
        
        /* Card hover effect enhancement */
        .card {
          cursor: pointer;
        }
        
        /* Glass morphism effect for modern look */
        .glass-effect {
          background: rgba(255, 255, 255, 0.2);
          backdropFilter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default App;