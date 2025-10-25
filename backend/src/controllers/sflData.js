import axios from "axios";

const sflDiggingData = {
  digging: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Farm ID is required",
        });
      }

      const response = await axios.get(
        `https://api.sunflower-land.com/visit/${id}`,
        {
          headers: {
            "x-api-key": process.env.SUNFLOWER_LAND_API_KEY,
          },
        }
      );

      if (!response.data) {
        throw new Error("Sunflower Land API doesn't return data");
      }

      res.status(200).json({
        success: true,
        message: "Successfully obtain data of Sunflower Land",
        data: {
          digging: response.data.visitedFarmState.desert.digging || [],
          farmID: id,
        },
      });
    } catch (error) {
      console.error("Error Obtaining Data:", error.message);

      let statusCode = 500;
      let errorMessage = "Server Error";

      if (error.response) {
        statusCode = error.response.status;
        errorMessage = `Query error with Sunflower Land API: ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = "Sunflower Land API isn't responding";
      }

      res.status(statusCode).json({
        success: false,
        message: errorMessage,
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
};

export default sflDiggingData;