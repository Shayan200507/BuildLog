import { pool } from "./Connection.ts";

type SamplePost = {
  blogName: string;
  title: string;
  body: string;
  imgurl: string;
  tags: string[];
};

const samplePosts: SamplePost[] = [
  {
    blogName: "Frontend Notes",
    title: "Building a Responsive Post Layout",
    body: "A practical walkthrough of responsive layouts, image sizing, and readable spacing across desktop and mobile screens.",
    imgurl: "/src/assets/post-images/responsive-design.png",
    tags: ["React", "TypeScript", "CSS", "Frontend"],
  },
  {
    blogName: "Frontend Notes",
    title: "A Calm Developer Workspace",
    body: "Small improvements to component structure and development workflow can make frontend work easier to understand and maintain.",
    imgurl: "/src/assets/post-images/developer-workspace.png",
    tags: ["React", "Productivity", "Frontend"],
  },
  {
    blogName: "Backend Journal",
    title: "Designing Relational Database Tables",
    body: "Learn how primary keys, foreign keys, and join tables model one-to-many and many-to-many relationships in PostgreSQL.",
    imgurl: "/src/assets/post-images/database-design.png",
    tags: ["PostgreSQL", "Database", "Backend"],
  },
  {
    blogName: "Backend Journal",
    title: "Debugging an Express API",
    body: "A repeatable process for tracing request parameters, checking SQL queries, and returning useful HTTP error responses.",
    imgurl: "/src/assets/post-images/debugging-session.png",
    tags: ["Express", "TypeScript", "Debugging", "Backend"],
  },
  {
    blogName: "Build Log",
    title: "Planning a Feature Before Coding",
    body: "Breaking a feature into database, API, and interface tasks helps reveal dependencies before implementation begins.",
    imgurl: "/src/assets/post-images/project-planning.png",
    tags: ["Planning", "Productivity", "Full Stack"],
  },
  {
    blogName: "Build Log",
    title: "Connecting the Frontend to the Backend",
    body: "An overview of how browser requests move through routes and controllers before reaching PostgreSQL and returning JSON.",
    imgurl: "/src/assets/post-images/web-architecture.png",
    tags: ["React", "Express", "PostgreSQL", "Full Stack"],
  },
];

const client = await pool.connect();

try {
  await client.query("BEGIN");

  for (const samplePost of samplePosts) {
    const blogResult = await client.query<{ blog_id: number }>(
      "SELECT blog_id FROM blogs WHERE name = $1 ORDER BY blog_id LIMIT 1",
      [samplePost.blogName],
    );

    if (blogResult.rowCount === 0) {
      console.warn(`Skipped missing blog: ${samplePost.blogName}`);
      continue;
    }

    const blogId = blogResult.rows[0].blog_id;
    const existingPost = await client.query<{ post_id: number }>(
      "SELECT post_id FROM posts WHERE blog_id = $1 AND title = $2 LIMIT 1",
      [blogId, samplePost.title],
    );

    let postId = existingPost.rows[0]?.post_id;

    if (!postId) {
      const postResult = await client.query<{ post_id: number }>(
        `INSERT INTO posts (blog_id, title, body, imgurl)
         VALUES ($1, $2, $3, $4)
         RETURNING post_id`,
        [blogId, samplePost.title, samplePost.body, samplePost.imgurl],
      );

      postId = postResult.rows[0].post_id;
    }

    for (const tagTitle of samplePost.tags) {
      const tagResult = await client.query<{ tag_id: number }>(
        `INSERT INTO tags (tag_title)
         VALUES ($1)
         ON CONFLICT (tag_title)
         DO UPDATE SET tag_title = EXCLUDED.tag_title
         RETURNING tag_id`,
        [tagTitle],
      );

      await client.query(
        `INSERT INTO tags_posts (post_id, tag_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [postId, tagResult.rows[0].tag_id],
      );
    }
  }

  await client.query("COMMIT");

  const totals = await client.query<{
    posts: string;
    tags: string;
    relationships: string;
  }>(`
    SELECT
      (SELECT COUNT(*) FROM posts) AS posts,
      (SELECT COUNT(*) FROM tags) AS tags,
      (SELECT COUNT(*) FROM tags_posts) AS relationships
  `);

  console.log("Sample posts and tags seeded", totals.rows[0]);
} catch (error) {
  await client.query("ROLLBACK");
  console.error(error);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
