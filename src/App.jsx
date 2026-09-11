import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Import foto dari folder assets lokal
import fotoProfil1 from "./assets/profil1.jpeg";
import fotoProfil2 from "./assets/profil2.jpeg";

/* ==================== 1. SUPABASE CLIENT SETUP ==================== */
const SUPABASE_URL = "https://facfxrjoxuhsgjgvlskn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_o1hQOQWmRM5FdRN1CKIlVQ_Xkqr0Zh9";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/* ==================== 2. NAVIGASI ==================== */
const NAV_ITEMS = [
  { id: "Home", label: "Dashboard" },
  { id: "Ekskul", label: "Ekskul" },
  { id: "Pendaftaran", label: "Pendaftaran" },
  { id: "Tentang", label: "Tentang" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="app-container">
      {/* CSS STYLING INTERNAL */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background-color: #0B0F19;
          color: #F8FAFC;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          background-color: #111827;
          padding: 1.2rem 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1F2937;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.3);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar h2 {
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #34D399 0%, #10B981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
        }

        .nav-links {
          display: flex;
          gap: 8px;
          background-color: #1F2937;
          padding: 4px;
          border-radius: 10px;
        }

        .nav-btn {
          background-color: transparent;
          border: none;
          color: #9CA3AF;
          padding: 8px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-btn:hover {
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .nav-btn.active {
          color: #FFFFFF;
          background-color: #10B981;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .main-content {
          padding: 2.5rem;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          flex: 1;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .main-content h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #F9FAFB;
          letter-spacing: -0.5px;
        }

        .primary-btn {
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: #FFFFFF;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.35);
        }

        /* HERO DASHBOARD CARD */
        .hero-banner {
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          border: 1px solid #334155;
          padding: 2.5rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .hero-banner::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; width: 40%;
          background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-banner h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #F8FAFC;
          margin-bottom: 0.5rem;
        }

        .hero-banner p {
          color: #94A3B8;
          font-size: 1rem;
          max-width: 600px;
          line-height: 1.5;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background-color: #1E293B;
          padding: 1.75rem;
          border-radius: 14px;
          border: 1px solid #334155;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          border-color: #10B981;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .stat-info h4 {
          color: #94A3B8;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .stat-number {
          font-size: 2.25rem;
          font-weight: 800;
          color: #F8FAFC;
          line-height: 1;
        }

        /* RECENT ACTIVITY SECTION */
        .dashboard-section-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .recent-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .recent-card {
          background-color: #1E293B;
          border: 1px solid #334155;
          padding: 1.25rem 1.5rem;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .recent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .recent-name {
          font-weight: 700;
          color: #F8FAFC;
          font-size: 1.05rem;
        }

        .recent-class {
          font-size: 0.8rem;
          background-color: #334155;
          color: #34D399;
          padding: 2px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        .recent-ekskul {
          color: #94A3B8;
          font-size: 0.9rem;
        }

        .recent-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
          border-top: 1px solid #334155;
          padding-top: 8px;
          font-size: 0.8rem;
          color: #64748B;
        }

        /* TABLES */
        .table-container {
          background-color: #1E293B;
          border-radius: 14px;
          border: 1px solid #334155;
          overflow: hidden;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.2);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .data-table th,
        .data-table td {
          padding: 16px 20px;
        }

        .data-table th {
          background-color: #111827;
          color: #94A3B8;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.8px;
          border-bottom: 1px solid #334155;
        }

        .data-table tr {
          border-bottom: 1px solid #334155;
          transition: background 0.15s ease;
        }

        .data-table tr:last-child {
          border-bottom: none;
        }

        .data-table tr:hover {
          background-color: rgba(51, 65, 85, 0.4);
        }

        .data-table td {
          color: #E2E8F0;
          font-size: 0.95rem;
        }

        .status-badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-diterima {
          background-color: rgba(16, 185, 129, 0.15);
          color: #34D399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-ditolak {
          background-color: rgba(239, 68, 68, 0.15);
          color: #F87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .status-pending {
          background-color: rgba(234, 179, 8, 0.15);
          color: #FACC15;
          border: 1px solid rgba(234, 179, 8, 0.3);
        }

        .action-btns {
          display: flex;
          gap: 8px;
        }

        .btn-detail {
          background-color: rgba(16, 185, 129, 0.15);
          color: #34D399;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-detail:hover {
          background-color: #10B981;
          color: white;
        }

        .btn-edit {
          background-color: rgba(59, 130, 246, 0.15);
          color: #60A5FA;
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-edit:hover {
          background-color: #3B82F6;
          color: white;
        }

        .btn-delete {
          background-color: rgba(239, 68, 68, 0.15);
          color: #F87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-delete:hover {
          background-color: #EF4444;
          color: white;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(11, 15, 25, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-card {
          background-color: #1E293B;
          border: 1px solid #334155;
          padding: 2.5rem;
          border-radius: 16px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .modal-card h4 {
          margin-bottom: 1.5rem;
          color: #F8FAFC;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .detail-item {
          margin-bottom: 1rem;
          font-size: 0.95rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #334155;
          padding-bottom: 8px;
        }

        .detail-item strong {
          color: #94A3B8;
        }

        .detail-item span {
          color: #F8FAFC;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          color: #94A3B8;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .form-control {
          width: 100%;
          padding: 12px;
          background-color: #0F172A;
          border: 1px solid #334155;
          border-radius: 8px;
          color: #F8FAFC;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-control:focus {
          border-color: #10B981;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 2rem;
        }

        .btn-secondary {
          background-color: #334155;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-secondary:hover {
          background-color: #475569;
        }

        /* TENTANG / PROFIL */
        .profile-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 1.5rem;
        }

        .profile-card {
          background-color: #1E293B;
          border-radius: 14px;
          padding: 2rem;
          text-align: center;
          border: 1px solid #334155;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }

        .profile-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #10B981, #34D399);
        }

        .profile-img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1.25rem auto;
          border: 4px solid #10B981;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .profile-card h4 {
          color: #F8FAFC;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .profile-card p {
          color: #94A3B8;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
      `}</style>

      {/* HEADER / NAVBAR */}
      <nav className="navbar">
        <h2>SMKN 1 Kraksaan</h2>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* KONTEN UTAMA */}
      <main className="main-content">
        {activeTab === "Home" && <HomeScreen />}
        {activeTab === "Ekskul" && <EkskulScreen />}
        {activeTab === "Pendaftaran" && <PendaftaranScreen />}
        {activeTab === "Tentang" && <TentangScreen />}
      </main>
    </div>
  );
}

/* ==================== 3. DASHBOARD ==================== */
function HomeScreen() {
  const [countEkskul, setCountEkskul] = useState(0);
  const [countPendaftaran, setCountPendaftaran] = useState(0);
  const [recentList, setRecentList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchDashboardData() {
      try {
        const { count: resEkskul } = await supabase
          .from("ekstrakurikuler")
          .select("*", { count: "exact", head: true });

        const { count: resPendaftaran } = await supabase
          .from("pendaftaran")
          .select("*", { count: "exact", head: true });

        const { data: recentData } = await supabase
          .from("pendaftaran")
          .select("*, ekstrakurikuler(nama_ekskul)")
          .order("id_pendaftaran", { ascending: false })
          .limit(3);

        if (isMounted) {
          if (resEkskul !== null) setCountEkskul(resEkskul);
          if (resPendaftaran !== null) setCountPendaftaran(resPendaftaran);
          if (recentData) setRecentList(recentData);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="hero-banner">
        <h1>Sistem Manajemen Ekstrakurikuler</h1>
        <p>
          Pusat pengelolaan data kegiatan ekstrakurikuler dan pendaftaran siswa
          terintegrasi secara profesional di SMKN 1 Kraksaan.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h4>Total Ekskul Aktif</h4>
            <p className="stat-number">{countEkskul}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h4>Total Pendaftar</h4>
            <p className="stat-number">{countPendaftaran}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section-title">
        <span>⚡ Pendaftar Terbaru</span>
      </div>
      <div className="recent-grid">
        {recentList.map((item) => {
          const statusClass =
            item.status_pendaftaran === "Diterima"
              ? "status-diterima"
              : item.status_pendaftaran === "Ditolak"
                ? "status-ditolak"
                : "status-pending";

          return (
            <div key={item.id_pendaftaran} className="recent-card">
              <div className="recent-header">
                <span className="recent-name">{item.nama_siswa}</span>
                <span className="recent-class">{item.kelas}</span>
              </div>
              <div className="recent-ekskul">
                Pilihan:{" "}
                <strong>{item.ekstrakurikuler?.nama_ekskul || "-"}</strong>
              </div>
              <div className="recent-footer">
                <span className={`status-badge ${statusClass}`}>
                  {item.status_pendaftaran || "Pending"}
                </span>
                <span>{item.tanggal_daftar || "Baru saja"}</span>
              </div>
            </div>
          );
        })}
        {recentList.length === 0 && (
          <p style={{ color: "#94A3B8", fontSize: "0.95rem" }}>
            Belum ada data pendaftar terbaru.
          </p>
        )}
      </div>
    </div>
  );
}

/* ==================== 4. EKSKUL SCREEN (CRUD + DETAIL) ==================== */
function EkskulScreen() {
  const [ekskulList, setEkskulList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [namaEkskul, setNamaEkskul] = useState("");
  const [pembina, setPembina] = useState("");
  const [hari, setHari] = useState("");
  const [kuota, setKuota] = useState("");

  const fetchEkskulList = async () => {
    const { data, error } = await supabase
      .from("ekstrakurikuler")
      .select("*")
      .order("id_ekskul", { ascending: true });
    if (!error) setEkskulList(data || []);
  };

  useEffect(() => {
    let isMounted = true;
    async function loadEkskul() {
      const { data, error } = await supabase
        .from("ekstrakurikuler")
        .select("*")
        .order("id_ekskul", { ascending: true });
      if (!error && isMounted) {
        setEkskulList(data || []);
      }
    }
    loadEkskul();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setNamaEkskul(item.nama_ekskul || "");
      setPembina(item.pembina || "");
      setHari(item.hari || "");
      setKuota(item.kuota ? String(item.kuota) : "");
    } else {
      setEditingItem(null);
      setNamaEkskul("");
      setPembina("");
      setHari("");
      setKuota("");
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!namaEkskul || !pembina || !hari || !kuota) {
      alert("Semua kolom harus diisi!");
      return;
    }

    const payload = {
      nama_ekskul: namaEkskul,
      pembina: pembina,
      hari: hari,
      kuota: parseInt(kuota, 10),
    };

    if (editingItem) {
      const { error } = await supabase
        .from("ekstrakurikuler")
        .update(payload)
        .eq("id_ekskul", editingItem.id_ekskul);
      if (error) alert("Gagal update: " + error.message);
    } else {
      const { error } = await supabase
        .from("ekstrakurikuler")
        .insert([payload]);
      if (error) alert("Gagal tambah: " + error.message);
    }

    setModalOpen(false);
    fetchEkskulList();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ekskul ini?")) {
      const { error } = await supabase
        .from("ekstrakurikuler")
        .delete()
        .eq("id_ekskul", id);
      if (error) alert("Gagal hapus: " + error.message);
      else fetchEkskulList();
    }
  };

  return (
    <div>
      <div className="section-header">
        <h3>Kelola Data Ekstrakurikuler</h3>
        <button className="primary-btn" onClick={() => handleOpenModal()}>
          + Tambah Ekskul
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Ekskul</th>
              <th>Pembina</th>
              <th>Hari</th>
              <th>Kuota</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {ekskulList.map((item) => (
              <tr key={item.id_ekskul}>
                <td>
                  <strong>{item.nama_ekskul}</strong>
                </td>
                <td>{item.pembina}</td>
                <td>{item.hari}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: "#334155", color: "#34D399" }}
                  >
                    {item.kuota} Anggota
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button
                      className="btn-detail"
                      onClick={() => handleOpenDetail(item)}
                    >
                      Detail
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => handleOpenModal(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id_ekskul)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {ekskulList.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    color: "#94A3B8",
                    padding: "2rem",
                  }}
                >
                  Belum ada data ekskul.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Ekskul */}
      {detailModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h4>Detail Ekstrakurikuler</h4>
            <div className="detail-item">
              <strong>ID Ekskul:</strong> <span>{selectedItem.id_ekskul}</span>
            </div>
            <div className="detail-item">
              <strong>Nama Ekskul:</strong>{" "}
              <span>{selectedItem.nama_ekskul}</span>
            </div>
            <div className="detail-item">
              <strong>Pembina:</strong> <span>{selectedItem.pembina}</span>
            </div>
            <div className="detail-item">
              <strong>Hari Latihan:</strong> <span>{selectedItem.hari}</span>
            </div>
            <div className="detail-item">
              <strong>Kuota:</strong> <span>{selectedItem.kuota} Anggota</span>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="primary-btn"
                onClick={() => setDetailModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form Tambah/Edit Ekskul */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h4>{editingItem ? "Edit Ekskul" : "Tambah Ekskul Baru"}</h4>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Nama Ekskul</label>
                <input
                  className="form-control"
                  value={namaEkskul}
                  onChange={(e) => setNamaEkskul(e.target.value)}
                  placeholder="Contoh: Paskibra"
                />
              </div>
              <div className="form-group">
                <label>Nama Pembina</label>
                <input
                  className="form-control"
                  value={pembina}
                  onChange={(e) => setPembina(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Pd"
                />
              </div>
              <div className="form-group">
                <label>Hari Latihan</label>
                <input
                  className="form-control"
                  value={hari}
                  onChange={(e) => setHari(e.target.value)}
                  placeholder="Contoh: Jumat"
                />
              </div>
              <div className="form-group">
                <label>Kuota Anggota</label>
                <input
                  className="form-control"
                  type="number"
                  value={kuota}
                  onChange={(e) => setKuota(e.target.value)}
                  placeholder="Contoh: 30"
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="primary-btn">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== 5. PENDAFTARAN SCREEN (CRUD + DETAIL) ==================== */
function PendaftaranScreen() {
  const [pendaftaranList, setPendaftaranList] = useState([]);
  const [ekskulOptions, setEkskulOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [namaSiswa, setNamaSiswa] = useState("");
  const [kelas, setKelas] = useState("");
  const [nis, setNis] = useState("");
  const [noHp, setNoHp] = useState("");
  const [idEkskul, setIdEkskul] = useState("");
  const [statusPendaftaran, setStatusPendaftaran] = useState("Pending");

  const fetchPendaftaranData = async () => {
    const { data, error } = await supabase
      .from("pendaftaran")
      .select("*, ekstrakurikuler(nama_ekskul)")
      .order("id_pendaftaran", { ascending: false });
    if (!error) setPendaftaranList(data || []);
  };

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const { data: pData, error: pError } = await supabase
        .from("pendaftaran")
        .select("*, ekstrakurikuler(nama_ekskul)")
        .order("id_pendaftaran", { ascending: false });

      const { data: eData } = await supabase
        .from("ekstrakurikuler")
        .select("id_ekskul, nama_ekskul");

      if (isMounted) {
        if (!pError) setPendaftaranList(pData || []);
        if (eData && eData.length > 0) {
          setEkskulOptions(eData);
          setIdEkskul((prev) => prev || eData[0].id_ekskul);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setNamaSiswa(item.nama_siswa || "");
      setKelas(item.kelas || "");
      setNis(item.nis || "");
      setNoHp(item.no_hp || "");
      setIdEkskul(item.id_ekskul || (ekskulOptions[0]?.id_ekskul ?? ""));
      setStatusPendaftaran(item.status_pendaftaran || "Pending");
    } else {
      setEditingItem(null);
      setNamaSiswa("");
      setKelas("");
      setNis("");
      setNoHp("");
      setIdEkskul(ekskulOptions[0]?.id_ekskul ?? "");
      setStatusPendaftaran("Pending");
    }
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!namaSiswa || !kelas || !idEkskul) {
      alert("Nama Siswa, Kelas, dan Pilihan Ekskul wajib diisi!");
      return;
    }

    const payload = {
      nama_siswa: namaSiswa,
      kelas: kelas,
      nis: nis,
      no_hp: noHp,
      id_ekskul: idEkskul,
      status_pendaftaran: statusPendaftaran,
      tanggal_daftar: new Date().toISOString().split("T")[0],
    };

    if (editingItem) {
      const { error } = await supabase
        .from("pendaftaran")
        .update(payload)
        .eq("id_pendaftaran", editingItem.id_pendaftaran);
      if (error) alert("Gagal update: " + error.message);
    } else {
      const { error } = await supabase.from("pendaftaran").insert([payload]);
      if (error) alert("Gagal tambah: " + error.message);
    }

    setModalOpen(false);
    fetchPendaftaranData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data pendaftaran ini?")) {
      const { error } = await supabase
        .from("pendaftaran")
        .delete()
        .eq("id_pendaftaran", id);
      if (error) alert("Gagal hapus: " + error.message);
      else fetchPendaftaranData();
    }
  };

  return (
    <div>
      <div className="section-header">
        <h3>Kelola Data Pendaftaran Siswa</h3>
        <button className="primary-btn" onClick={() => handleOpenModal()}>
          + Pendaftaran Baru
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th>Ekskul Pilihan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pendaftaranList.map((item) => {
              const statusClass =
                item.status_pendaftaran === "Diterima"
                  ? "status-diterima"
                  : item.status_pendaftaran === "Ditolak"
                    ? "status-ditolak"
                    : "status-pending";

              return (
                <tr key={item.id_pendaftaran}>
                  <td>
                    <strong>{item.nama_siswa}</strong>
                  </td>
                  <td>{item.kelas}</td>
                  <td>{item.ekstrakurikuler?.nama_ekskul || "-"}</td>
                  <td>
                    <span className={`status-badge ${statusClass}`}>
                      {item.status_pendaftaran || "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="btn-detail"
                        onClick={() => handleOpenDetail(item)}
                      >
                        Detail
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => handleOpenModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item.id_pendaftaran)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {pendaftaranList.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    color: "#94A3B8",
                    padding: "2rem",
                  }}
                >
                  Belum ada data pendaftaran.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Pendaftaran */}
      {detailModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h4>Detail Pendaftaran Siswa</h4>
            <div className="detail-item">
              <strong>ID Pendaftaran:</strong>{" "}
              <span>{selectedItem.id_pendaftaran}</span>
            </div>
            <div className="detail-item">
              <strong>Nama Siswa:</strong>{" "}
              <span>{selectedItem.nama_siswa}</span>
            </div>
            <div className="detail-item">
              <strong>Kelas:</strong> <span>{selectedItem.kelas}</span>
            </div>
            <div className="detail-item">
              <strong>NIS:</strong> <span>{selectedItem.nis || "-"}</span>
            </div>
            <div className="detail-item">
              <strong>No HP:</strong> <span>{selectedItem.no_hp || "-"}</span>
            </div>
            <div className="detail-item">
              <strong>Ekskul Pilihan:</strong>{" "}
              <span>{selectedItem.ekstrakurikuler?.nama_ekskul || "-"}</span>
            </div>
            <div className="detail-item">
              <strong>Status:</strong>{" "}
              <span>{selectedItem.status_pendaftaran || "Pending"}</span>
            </div>
            <div className="detail-item">
              <strong>Tanggal Daftar:</strong>{" "}
              <span>{selectedItem.tanggal_daftar || "-"}</span>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="primary-btn"
                onClick={() => setDetailModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form Tambah/Edit Pendaftaran */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h4>
              {editingItem ? "Edit Pendaftaran" : "Tambah Pendaftaran Siswa"}
            </h4>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Nama Siswa</label>
                <input
                  className="form-control"
                  value={namaSiswa}
                  onChange={(e) => setNamaSiswa(e.target.value)}
                  placeholder="Nama Lengkap Siswa"
                />
              </div>
              <div className="form-group">
                <label>Kelas</label>
                <input
                  className="form-control"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="Contoh: XI RPL 1"
                />
              </div>
              <div className="form-group">
                <label>NIS</label>
                <input
                  className="form-control"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  placeholder="Nomor Induk Siswa"
                />
              </div>
              <div className="form-group">
                <label>No HP / WhatsApp</label>
                <input
                  className="form-control"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div className="form-group">
                <label>Pilih Ekstrakurikuler</label>
                <select
                  className="form-control"
                  value={idEkskul}
                  onChange={(e) => setIdEkskul(e.target.value)}
                >
                  {ekskulOptions.map((opt) => (
                    <option key={opt.id_ekskul} value={opt.id_ekskul}>
                      {opt.nama_ekskul}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status Pendaftaran</label>
                <select
                  className="form-control"
                  value={statusPendaftaran}
                  onChange={(e) => setStatusPendaftaran(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="primary-btn">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== 6. TENTANG SCREEN (PROFIL + DETAIL DEVELOPER) ==================== */
function TentangScreen() {
  const [detailModalOpen, setDetailModalOpen] = useState(function () {
    return false;
  });
  const [selectedDev, setSelectedDev] = useState(function () {
    return null;
  });

  const handleOpenDetail = (dev) => {
    setSelectedDev(dev);
    setDetailModalOpen(true);
  };

  const dev1 = {
    nama: "Paina Anggraini",
    kelas: "XII RPL 1",
    peran: "Mobile & UI Developer",
    foto: fotoProfil1,
    deskripsi:
      "Bertanggung jawab penuh atas perancangan antarmuka pengguna (UI/UX), penataan tata letak aplikasi, dan integrasi komponen frontend agar nyaman digunakan.",
    keahlian: ["React", "JavaScript", "UI/UX Design", "CSS Styling"],
    kontak: "paina@smkn1kraksaan.sch.id",
  };

  const dev2 = {
    nama: "Zafiroh Dewi Yulia Putri",
    kelas: "XII RPL 1",
    peran: "Database & Backend Developer",
    foto: fotoProfil2,
    deskripsi:
      "Mengelola integrasi database Supabase secara menyeluruh, perancangan relasi antar tabel (database schema), serta logika fungsionalitas sistem aplikasi.",
    keahlian: ["Supabase", "PostgreSQL", "Backend Logic", "API Integration"],
    kontak: "zafiroh@smkn1kraksaan.sch.id",
  };

  return (
    <div>
      <h3>Tentang Pengembang & Sistem</h3>
      <p
        style={{
          color: "#94A3B8",
          marginBottom: "1.5rem",
          fontSize: "0.95rem",
        }}
      >
        Sistem Manajemen Ekstrakurikuler SMKN 1 Kraksaan dikembangkan oleh tim
        pengembang aplikasi perangkat lunak.
      </p>

      <div className="profile-grid">
        {/* Profil 1 */}
        <div className="profile-card">
          <img
            src={fotoProfil1}
            alt="Paina Anggraini"
            className="profile-img"
          />
          <h4>{dev1.nama}</h4>
          <p>
            {dev1.kelas} - {dev1.peran}
          </p>
          <p style={{ fontSize: "0.85rem", color: "#CBD5E1" }}>
            {dev1.deskripsi}
          </p>
          <div className="skill-tags">
            <span className="skill-tag">React</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">UI/UX</span>
          </div>
          <div style={{ marginTop: "1.2rem" }}>
            <button
              className="btn-detail"
              onClick={() => handleOpenDetail(dev1)}
            >
              Detail Profil
            </button>
          </div>
        </div>

        {/* Profil 2 */}
        <div className="profile-card">
          <img
            src={fotoProfil2}
            alt="Zafiroh Dewi Yulia Putri"
            className="profile-img"
          />
          <h4>{dev2.nama}</h4>
          <p>
            {dev2.kelas} - {dev2.peran}
          </p>
          <p style={{ fontSize: "0.85rem", color: "#CBD5E1" }}>
            {dev2.deskripsi}
          </p>
          <div className="skill-tags">
            <span className="skill-tag">Supabase</span>
            <span className="skill-tag">PostgreSQL</span>
            <span className="skill-tag">Backend</span>
          </div>
          <div style={{ marginTop: "1.2rem" }}>
            <button
              className="btn-detail"
              onClick={() => handleOpenDetail(dev2)}
            >
              Detail Profil
            </button>
          </div>
        </div>
      </div>

      {/* Modal Detail Developer */}
      {detailModalOpen && selectedDev && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ textAlign: "center" }}>
            <img
              src={selectedDev.foto}
              alt={selectedDev.nama}
              className="profile-img"
              style={{
                width: "90px",
                height: "90px",
                margin: "0 auto 1rem auto",
              }}
            />
            <h4>{selectedDev.nama}</h4>
            <div style={{ textAlign: "left", marginTop: "1rem" }}>
              <div className="detail-item">
                <strong>Kelas:</strong> <span>{selectedDev.kelas}</span>
              </div>
              <div className="detail-item">
                <strong>Peran:</strong> <span>{selectedDev.peran}</span>
              </div>
              <div className="detail-item">
                <strong>Email:</strong> <span>{selectedDev.kontak}</span>
              </div>
              <div
                className="detail-item"
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  borderBottom: "none",
                }}
              >
                <strong>Deskripsi:</strong>
                <p
                  style={{
                    color: "#CBD5E1",
                    fontSize: "0.9rem",
                    marginTop: "4px",
                  }}
                >
                  {selectedDev.deskripsi}
                </p>
              </div>
              <div
                className="detail-item"
                style={{
                  display: "block",
                  marginTop: "0.5rem",
                  borderBottom: "none",
                }}
              >
                <strong>Keahlian:</strong>
                <div
                  className="skill-tags"
                  style={{ justifyContent: "flex-start", marginTop: "6px" }}
                >
                  {selectedDev.keahlian.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-actions" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="primary-btn"
                onClick={() => setDetailModalOpen(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
