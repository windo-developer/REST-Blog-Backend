import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map(i => ({
    title: `Post #${i}`,
    body:
      'Lorem ipsum dolor sit amet, consectiruer adipiscing elit, sed do eimsood tem-por incidienunt ut labore et dolore manag aliqua. ut enim ead amibin veriam, quis nostrud exerctioion ullamco laboir nsisi ui alipqesex ae commodo cobquittale. duis autio iririe dololr in erepqeoxkhinir in voliipate velis esse ciilim dolore eu fugit nulla proaru excpoitksink occaeacta cuput nono poriient, sun itn culpa oquii foofcia ldessirum mol-lit anim id est laoborum.',
    tags: ['Fake', 'Data'],
  }));

  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
}
