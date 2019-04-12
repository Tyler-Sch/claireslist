import React from 'react';

export default function WelcomeText() {
  return (
    <div>
      <div className="container">
        <p className='bigger'>
          <span className='huge heavy oblique tahoma-text'>W</span>elcome to Claire's List
        </p>
        <br />
        <div className="container">
          <p>
            This is a web site for sharing the things you dont use too often.
          </p>
          <br />
          <p>
            Maybe you have a power drill you use once a year, or a
            kayak you take out every so often or something else you'd be
            glad to share.
          </p>
          <br />
          <p>So why not put it on the internet and share it with friends
          . Maybe they'll share things with you too</p>
        </div>
      </div>
      <div className="container">
        <p className="bigger">
          <span className="huge heavy oblique tohoma-text">H</span>
          ow to share your stuff???
        </p>
        <div className="container">
          <p>It's simple. If you want to start a new list, just click the
          create new list button at the top of the page. If a friend
          was nice enough to start one for you, ask them to give you the url.
          </p>
          <br />
        </div>
      </div>
    </div>
  )
}
