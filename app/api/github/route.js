export async function POST(req) {
  const { query, variables } = await req.json();

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await res.json();
  return Response.json(data);
}