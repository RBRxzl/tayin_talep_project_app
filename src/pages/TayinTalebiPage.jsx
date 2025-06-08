  import React, { useEffect, useState } from 'react';
  import {
    getCurrentPersonnel,
    getCities,
    getRelocations,
    createRelocation,
  } from '../api/auth';

  function TayinTalepPage() {
    const [personnel, setPersonnel] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [reason, setReason] = useState('');
    const [relocations, setRelocations] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const personnelData = await getCurrentPersonnel();
          setPersonnel(personnelData);
          const cityList = await getCities();
          setCities(cityList);
          const relocList = await getRelocations(personnelData.personelId);
          setRelocations(relocList);
        } catch (error) {
          console.error('Veriler alınamadı:', error);
        }
      }

      fetchData();
    }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const cityObj = cities.find((c) => c.id.toString() === selectedCity);
  if (!cityObj) {
    alert("Geçerli bir şehir seçmelisiniz.");
    return;
  }

  const formattedCity =
    cityObj.name.charAt(0).toUpperCase() + cityObj.name.slice(1).toLowerCase();

  try {
    await createRelocation({
      currentWorkplace: personnel.workplace,
      reason,
      requestedCity: formattedCity,
      requestDate: new Date().toISOString().split('T')[0],
      personnelId: personnel.personelId,
    });

    alert('Talep başarıyla oluşturuldu.');
    setReason('');
    setSelectedCity('');

    const updatedRelocations = await getRelocations(personnel.personelId);
    setRelocations(updatedRelocations);
  } catch (error) {
    alert('Talep oluşturulamadı.');
    console.error(error);
  }
};


    if (!personnel) return <p>Yükleniyor...</p>;

    return (
      <div className="container mt-5">
        <h2 className='mb-5'>Tayin Talep Formu</h2>

        <div className="mb-3">
          <strong>Ad soyad:</strong> {personnel.name} {personnel.surname}<br />
          <strong>Sicil No:</strong> {personnel.sicilNo}<br />
          <strong>Mevcut Şehir:</strong> {personnel.workplace}
        </div>

        <form onSubmit={handleSubmit} className="mb-5">
          <div className="row mb-3">
            <div className="col">
              <label>Mevcut Şehir</label>
              <input type="text" className="form-control" value={personnel.workplace} disabled />
            </div>
            <div className="col">
              <label>İstenen Şehir</label>
              <select
                className="form-control"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                required
              >
                <option value="">Şehir seçin</option>
                {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option> 
                ))}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label>Tayin Nedeni</label>
            <input
              type="text"
              className="form-control"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success">Talep Gönder</button>
        </form>

        <h4>Bütün Taleplerim</h4>
        <ul className="list-group">
          {relocations.map((r) => (
            <li key={r.id} className="list-group-item">
              {r.requestDate} - {r.currentWorkplace} → {r.requestedCity} ({r.reason})
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default TayinTalepPage;
