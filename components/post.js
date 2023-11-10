export default function PostBody({title, date, body}) {
  return (
    <div>
      <p className={`bg-primary text-3xl rounded-lg p-2 mb-4`}>
      {title}
      </p>
      {date}
      <div dangerouslySetInnerHTML={{__html: body}}></div>
    </div>
  )
}
