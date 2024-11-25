import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  try {
    const hebrewDate = await axios.get(
      `https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&strict=1`
    );

    return new Response(JSON.stringify(hebrewDate.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response("An error occurred", { status: 400 });
  }
}
