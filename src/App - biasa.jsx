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
          background-color: #0F172A;
          color: #F8FAFC;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          background-color: #1E293B;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #334155;
        }

        .navbar h2 {
          font-size: 1.2rem;
          color: #F8FAFC;
        }

        .nav-links {
          display: flex;
          gap: 10px;
        }

        .nav-btn {
          background-color: transparent;
          border: none;
          color: #94A3B8;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .nav-btn:hover {
          color: #FFFFFF;
          background-color: #334155;
        }

        .nav-btn.active {
          color: #FFFFFF;
          background-color: #10B981;
        }

        .main-content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          flex: 1;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .main-content h3 {
          font-size: 1.5rem;
          color: #F8FAFC;
        }

        .primary-btn {
          background-color: #10B981;
          color: #FFFFFF;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .primary-btn:hover {
          background-color: #059669;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-top: 1rem;
        }

        .stat-card {
          background-color: #1E293B;
          padding: 1.5rem;
          border-radius: 10px;
          border-left: 5px solid #10B981;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .stat-card h4 {
          color: #94A3B8;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #F8FAFC;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          background-color: #1E293B;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .data-table th,
        .data-table td {
          padding: 12px 16px;
          text-align: left;
        }

        .data-table th {
          background-color: #10B981;
          color: #FFFFFF;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }

        .data-table tr:nth-child(even) {
          background-color: #1E293B;
        }

        .data-table tr:nth-child(odd) {
          background-color: #24303F;
        }

        .data-table tr:hover {
          background-color: #334155;
        }

        .data-table td {
          border-bottom: 1px solid #334155;
          color: #CBD5E1;
          font-size: 0.95rem;
        }

        .action-btns {
          display: flex;
          gap: 6px;
        }

        .btn-detail {
          background-color: #10B981;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
        }

        .btn-edit {
          background-color: #3B82F6;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
        }

        .btn-delete {
          background-color: #EF4444;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-card {
          background-color: #1E293B;
          padding: 2rem;
          border-radius: 10px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .modal-card h4 {
          margin-bottom: 1rem;
          color: #F8FAFC;
        }

        .detail-item {
          margin-bottom: 0.8rem;
          font-size: 0.95rem;
        }

        .detail-item strong {
          color: #10B981;
          display: inline-block;
          width: 140px;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          color: #94A3B8;
          margin-bottom: 0.4rem;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          background-color: #0F172A;
          border: 1px solid #334155;
          border-radius: 6px;
          color: #F8FAFC;
          font-size: 0.95rem;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 1.5rem;
        }

        .btn-secondary {
          background-color: #475569;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }

        /* TENTANG / PROFIL */
        .profile-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 1rem;
        }

        .profile-card {
          background-color: #1E293B;
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-top: 4px solid #10B981;
        }

        .profile-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
          border: 3px solid #10B981;
        }

        .profile-card h4 {
          color: #F8FAFC;
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
        }

        .profile-card p {
          color: #94A3B8;
          font-size: 0.9rem;
          margin-bottom: 0.8rem;
        }

        .skill-tags {
          display: flex;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .skill-tag {
          background-color: #334155;
          color: #10B981;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
      `}</style>

      {/* HEADER / NAVBAR */}
      <nav className="navbar">
        <h2>Sistem Ekskul SMKN 1 Kraksaan</h2>
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

  useEffect(() => {
    let isMounted = true;
    async function fetchCounts() {
      try {
        const { count: resEkskul } = await supabase
          .from("ekstrakurikuler")
          .select("*", { count: "exact", head: true });

        const { count: resPendaftaran } = await supabase
          .from("pendaftaran")
          .select("*", { count: "exact", head: true });

        if (isMounted) {
          if (resEkskul !== null) setCountEkskul(resEkskul);
          if (resPendaftaran !== null) setCountPendaftaran(resPendaftaran);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchCounts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h3>Dashboard Ekstrakurikuler</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Ekskul</h4>
          <p className="stat-number">{countEkskul}</p>
        </div>
        <div className="stat-card">
          <h4>Total Pendaftar</h4>
          <p className="stat-number">{countPendaftaran}</p>
        </div>
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
              <td>{item.nama_ekskul}</td>
              <td>{item.pembina}</td>
              <td>{item.hari}</td>
              <td>{item.kuota} Anggota</td>
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
              <td colSpan="5" style={{ textAlign: "center", color: "#94A3B8" }}>
                Belum ada data ekskul.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Detail Ekskul */}
      {detailModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h4>Detail Ekstrakurikuler</h4>
            <div className="detail-item">
              <strong>ID Ekskul:</strong> {selectedItem.id_ekskul}
            </div>
            <div className="detail-item">
              <strong>Nama Ekskul:</strong> {selectedItem.nama_ekskul}
            </div>
            <div className="detail-item">
              <strong>Pembina:</strong> {selectedItem.pembina}
            </div>
            <div className="detail-item">
              <strong>Hari Latihan:</strong> {selectedItem.hari}
            </div>
            <div className="detail-item">
              <strong>Kuota:</strong> {selectedItem.kuota} Anggota
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
          {pendaftaranList.map((item) => (
            <tr key={item.id_pendaftaran}>
              <td>{item.nama_siswa}</td>
              <td>{item.kelas}</td>
              <td>{item.ekstrakurikuler?.nama_ekskul || "-"}</td>
              <td>
                <span
                  style={{
                    color:
                      item.status_pendaftaran === "Diterima"
                        ? "#10B981"
                        : item.status_pendaftaran === "Ditolak"
                          ? "#EF4444"
                          : "#EAB308",
                    fontWeight: "600",
                  }}
                >
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
          ))}
          {pendaftaranList.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#94A3B8" }}>
                Belum ada data pendaftaran.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Detail Pendaftaran */}
      {detailModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h4>Detail Pendaftaran Siswa</h4>
            <div className="detail-item">
              <strong>ID Pendaftaran:</strong> {selectedItem.id_pendaftaran}
            </div>
            <div className="detail-item">
              <strong>Nama Siswa:</strong> {selectedItem.nama_siswa}
            </div>
            <div className="detail-item">
              <strong>Kelas:</strong> {selectedItem.kelas}
            </div>
            <div className="detail-item">
              <strong>NIS:</strong> {selectedItem.nis || "-"}
            </div>
            <div className="detail-item">
              <strong>No HP:</strong> {selectedItem.no_hp || "-"}
            </div>
            <div className="detail-item">
              <strong>Ekskul Pilihan:</strong>{" "}
              {selectedItem.ekstrakurikuler?.nama_ekskul || "-"}
            </div>
            <div className="detail-item">
              <strong>Status:</strong>{" "}
              {selectedItem.status_pendaftaran || "Pending"}
            </div>
            <div className="detail-item">
              <strong>Tanggal Daftar:</strong>{" "}
              {selectedItem.tanggal_daftar || "-"}
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
                <strong>Kelas:</strong> {selectedDev.kelas}
              </div>
              <div className="detail-item">
                <strong>Peran:</strong> {selectedDev.peran}
              </div>
              <div className="detail-item">
                <strong>Email:</strong> {selectedDev.kontak}
              </div>
              <div
                className="detail-item"
                style={{ display: "block", marginTop: "0.5rem" }}
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
                style={{ display: "block", marginTop: "0.5rem" }}
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
