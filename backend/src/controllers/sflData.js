import axios from 'axios';

const sflDiggingData = {
  digging: async (req, res) => {
    try {
      const { id } = req.params; 
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Se requiere el parámetro ID'
        });
      }

      const response = await axios.get(`https://api.sunflower-land.com/visit/${id}`);
      
      if (!response.data) {
        throw new Error('La API no devolvió datos');
      }

      res.status(200).json({
        success: true,
        message: 'Datos obtenidos correctamente de Sunflower Land',
        data: response.data
      });

    } catch (error) {
      console.error('Error al obtener datos:', error.message);
      
      let statusCode = 500;
      let errorMessage = 'Error en el servidor';
      
      if (error.response) {
        statusCode = error.response.status;
        errorMessage = `Error al consultar Sunflower Land API: ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'No se recibió respuesta de Sunflower Land API';
      }

      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

export default sflDiggingData;