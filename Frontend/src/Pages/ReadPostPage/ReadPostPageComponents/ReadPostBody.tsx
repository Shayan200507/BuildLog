import { useNavigate } from "react-router"

type ReadPostBodyProps = {
  postId: string | undefined
}

export function ReadPostBody({ postId }: ReadPostBodyProps) {
  const navigate = useNavigate()

  return (
    <main className="ReadPostBody">
      <button
        className="ReadPostBackButton"
        type="button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <article data-post-id={postId}>
        {/* Fetch and render the selected post here. */}
      </article>
    </main>
  )
}
