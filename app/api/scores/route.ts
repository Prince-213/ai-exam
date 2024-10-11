export async function GET(req: Request, res: Response) {
  const response = await fetch("http://localhost:3000/scores", {
    cache: "no-cache"
  });

  const result = await response.json();

  return Response.json({ data: result });
}
