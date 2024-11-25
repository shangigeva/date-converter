import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const toDate = searchParams.get("toDate");
  if (!startDate || !toDate)
    return new Response("Date is required", {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  try {
    const hebrewDate = await axios.get(
      `https://www.hebcal.com/converter?cfg=json&start=${startDate}&end=${toDate}&g2h=1`
    );

    return new Response(JSON.stringify(hebrewDate.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response("An error occurred", { status: 400 });
  }
}
