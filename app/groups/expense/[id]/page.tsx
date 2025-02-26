export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
    console.log("id", id)
    return <div>My Post: {id}</div>
  }

