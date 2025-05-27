import React from 'react';
import '../index.css';

function AdminHome() {
  const nombre = localStorage.getItem('nombre');

  return (
      <div style={{ padding: '2rem' }}>
      {/* Bloque original que mantendrás sin cambios */}
      <div className="admin-home">
        <div className="admin-home-content">
          <h2>Bienvenido, {nombre}</h2>
          <div style={{ color: 'white', maxWidth: '800px' }}>
      <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: '#0a8754' }}>MISIÓN</h3>
      <p style={{ textAlign: 'justify' }}>
        Velar porque la prestación del servicio público de transporte de pasajeros sea digno, para generar una mejor calidad de vida a todos los usuarios en el municipio de Guatemala y sus áreas de influencia, mediante la planificación, fiscalización y control de un sistema integrado y eficiente de servicio de transporte de pasajeros.
      </p>

      <h3 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '2rem', color: '#0a8754' }}>VISIÓN</h3>
      <p style={{ textAlign: 'justify' }}>
        Cualquier persona puede optar a un servicio de transporte digno desde cualquier origen hacia cualquier destino dentro del municipio de Guatemala y sus áreas de influencia, contribuyendo así a construir la ciudad del futuro.
      </p>
    </div>
        </div>
      </div>

      {/* Nuevo bloque con imágenes y mapa */}
      <div
        style={{
            marginTop: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            justifyContent: 'center',
            color: 'white', // ✅ letras blancas
        }}
      >
        {/* Imágenes */}
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '600px' }}>
          <h3 style={{ color: 'white' }}>Mapa de Líneas del Transmetro</h3>
          <img
            src="/images/transmetro1.png"
            alt="Mapa Transmetro 1"
            style={{ width: '100%', marginBottom: '1rem', borderRadius: '10px' }}
          />
          <img
            src="/images/transmetro2.png"
            alt="Mapa Transmetro 2"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        {/* Mapa Google */}
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '600px' }}>
          <h3 style={{ color: 'white' }}>Ubicación General</h3>
          <iframe
            title="Mapa Transmetro"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.064509166552!2d-90.5162533!3d14.6349144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a1f1bb7e801b%3A0x7a57c02e2a2e3071!2sTransmetro!5e0!3m2!1ses!2sgt!4v1716680000000!5m2!1ses!2sgt"
            width="100%"
            height="700"
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>

    
  );
}

export default AdminHome;
