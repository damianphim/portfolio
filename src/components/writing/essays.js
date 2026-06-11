// Data file for the Writing section.
// Add new essays by appending to this array. Each entry needs:
// - slug: used in the URL /writing/:slug (must be permanent once published)
// - title: essay title
// - date: human-readable date string
// - description: one-line summary shown on the index page
// - content: array of paragraphs. Each paragraph is either a plain string,
//   or an array of segments where a segment can be a string or
//   { text, href } for an inline link.

export const essays = [
  {
    slug: 'internets-heir',
    title: "The Internet's Heir to the Gatekeepers of the Public Sphere",
    date: 'June 11, 2026',
    description:
      "On Ethan Zuckerman's framing of AI as a new communication age, and why it's better understood as a new layer of mediation on the internet's existing infrastructure.",
    content: [
      [
        'In a 2025 ',
        { text: 'blog post', href: 'https://ethanzuckerman.com/2025/04/24/aixdemocracy-what-are-the-politics-of-ai/' },
        ", Ethan Zuckerman treats AI as a new communication age whose character is still undetermined; however, that framing itself is the error: it's not a new age to be steered, it's a further corrosion of the current one.",
      ],
      "Communication has gone through several ages over the last century; society quickly graduated from the physical delivery of newspapers and information to the TV. The groups who ran the few stations decided and framed the news that reached the people. A one-to-many system. The age of the internet revolutionized this idea. During the internet's inception, scholars and technologists discussed what the internet could become: a public sphere where everyone, not just elites, could participate and decide which issues were important, and then communicate and deliberate over them. The current landscape of the internet has not fulfilled these dreams, yet has still provided a many-to-many form of communication on an unparalleled scale.",
      "Now, Zuckerman and scholars around the world argue that AI will be the new age of communication. A new form of communication that could either uplift democracy and usher us into an age of techno-utopianism, or send us further down the path of polarization, plutocracy, and authoritarianism. However, I'd argue that AI is not the next age of communication, but a layer of mediation on the current infrastructure. This theory does not dilute AI's importance, but raises concerns about how it's applied given its current capabilities.",
      "One of the core tenets of Habermas's definition of the public sphere is that it relies on deliberation between the masses. If the public sphere is where opinion gets formed through encountering others' arguments, an AI that digests everything into a single confident answer degrades that deliberative mechanism. In this case, AI flattens the user's experience of the existing many-to-many infrastructure and re-imposes the old one-to-many logic on top of it. Importantly, this change in communication is not a change of structure, but a change in how the user experiences the structure. The internet changed the structure of communication by creating a system fundamentally different from the TV. If one were to wipe the internet, AI ceases to function; wipe the TV, the internet barely notices. AI is one-to-many delivery sitting on many-to-many infrastructure; the structure is intact, but the access is mediated. A new age changes how people can communicate. A layer changes what reaches them.",
      "We are in AI's infancy, and it certainly could stand on its own in the future. But by characterizing AI as a new age right now, scholars are repeating the same mistakes as their early-internet counterparts; they were so focused on what the internet could become that they did not realize what the internet was actively developing into: a gatekeeper. Algorithmic sorting pushing voices down, engagement-ranking, platforms deciding what surfaces. The internet promised to abolish gatekeepers and instead grew new ones. By asserting AI as a new age, scholars are failing, again, to recognize AI as the gatekeepers' heir.",
    ],
  },
];
