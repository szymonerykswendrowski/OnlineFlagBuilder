export default async function handler(req, res) {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Pinned to a specific version of Stable Diffusion
        // See https://replicate.com/stability-ai/sdxl
        version: "8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
  
        // This is the text prompt that will be submitted by a form on the frontend
        input: { prompt: "A realistic flag of a nation, cinematic, dramatic", image: req.body.prompt , prompt_strength: 0.9,
        refine: "expert_ensemble_refiner" },
      }),
    });
  
    if (response.status !== 201) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  }