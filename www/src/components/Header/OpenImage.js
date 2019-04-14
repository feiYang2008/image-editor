import React, {Component} from 'react';

const BtnWrapperStyle = {height: '36px', display: 'flex', alignItems: 'center', position: 'relative'};
// todo: close the dropdown menu if user cancel the File dialog without selecting any files
export default class OpenImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownVisible: false,
      openCamera: false,
    };
  }

  toggleDropdown = () => this.setState({dropdownVisible: !this.state.dropdownVisible});
  showDropdown = () => this.setState({dropdownVisible: true});
  hideDropdown = () => this.setState({dropdownVisible: false});

  componentDidMount = () => {
    document.addEventListener('click', evt => {
      if (!evt.target.closest('.img-file-handler-btn-wrapper') && this.state.dropdownVisible) {
        this.hideDropdown();
      }

      if (evt.target.classList.contains('test-image')) {
        this.props.loadImage(evt.target.id);
        this.hideDropdown()
      }
    });
  };

  componentDidUpdate = () => {};

  // to allow to select the same file, otherwise onChange won't get triggered
  onFileClick = evt => evt.target.value = null;
  onFileChange = evt => {
    this.setState({dropdownVisible: false});
    this.props.loadImage(evt.target.files[0]);
  };

  toggleCameraModal = () => this.setState({openCamera: !this.state.openCamera});

  onGoToURL = evt => {
    let url = evt.target.parentElement.querySelector('#img-url').value;
    // todo: keep the dropdown menu open, while fetching the img, and showing a spinning icon on Go button
    // if succeeded, close the dropdown menu, otherwise, show a failed tip
    // if the url is invalid, also show a failed, just keep it simple.
  };

  onKeyEnter = evt => {
    // todo: check url validity, if not valid, disable the 'Go' button.
    if (evt.key === 'Enter') {
      this.onGoToURL(evt);
    }
  };

  render() {
    return (
        <div style={BtnWrapperStyle} className='img-file-handler-btn-wrapper'>
          <div>
            <button onClick={this.toggleDropdown} className='img-file-handler-btn'>Open</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" className='svg-down-arrow' >
              <path fill="#CCC" d="M7.19 7.54L0 .34.34 0l6.85 6.85L14.04 0l.34.34-7.19 7.2z"/>
            </svg>
          </div>
          {
            !this.state.dropdownVisible ? null :
                <ul className='dropdown-menu'>
                  <li>
                    <label className='clickable'>Computer
                      <input type='file' accept='image/jpeg, image/png' onChange={this.onFileChange} onClick={this.onFileClick} style={{display: 'none'}}/>
                    </label>
                  </li>
                  <li className='clickable' onClick={this.toggleCameraModal}>Camera</li>
                  <li>
                    {/* invoke evt handler for the following input: pressing ENTER is the same as  */}
                    <input id='img-url' placeholder='Remote URL' onKeyUp={this.onKeyEnter}/>
                    <button className='primary-btn apply-btn' onClick={this.onGoToURL}
                            style={{color: '#ededed', marginLeft: '12px', height: '24px', width: '48px', fontSize: '15px'}}>Go</button>
                  </li>
                  <li className='test-image clickable' id='/img/JusticeLeague/wonder-woman.jpg'>DC/wonder-woman</li>
                  <li className='test-image clickable' id='/img/Avengers/endgame.png'>Avengers/endgame</li>
                  <li className='test-image clickable' id='/img/edgesPreservingDenoise/EmmaStone1.jpg'>Emma Stone 1 (remove freckles)</li>
                  <li className='test-image clickable' id='/img/edgesPreservingDenoise/EmmaStone2.jpg'>Emma Stone 2 (remove freckles)</li>
                  <li className='test-image clickable' id='/img/edgesPreservingDenoise/EddieRedmayne.jpg'>Eddie Redmayne (remove freckles)</li>
                  <li className='test-image clickable' id='/img/TrueBlood.jpg'>True Blood (temperature adjust)</li>
                  <li className='test-image clickable' id='/img/lowContrast/kitty.jpg'>Kitty (Low contrast)</li>
                  <li className='test-image clickable' id='/img/lowContrast/forest.jpg'>Forest (low contrast - too dark)</li>

                </ul>
          }
          {this.state.openCamera ? <Selfie toggleCameraModal={this.toggleCameraModal}/> : null}
        </div>
    )}
}

// https://googlechrome.github.io/samples/image-capture/grab-frame-take-photo.html
// https://stackoverflow.com/questions/33975431/how-can-i-capture-an-image-via-the-users-webcam-using-getusermedia
// https://www.jonathan-petitcolas.com/2016/08/24/taking-picture-from-webcam-using-canvas.html
// https://blog.prototypr.io/make-a-camera-web-app-tutorial-part-1-ec284af8dddf
// https://codepen.io/ekrof/pen/yOrPwv
// https://github.com/mdn/samples-server/blob/master/s/webrtc-capturestill/capture.js
// https://gist.github.com/anantn/1852070
// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
// https://www.html5rocks.com/en/tutorials/getusermedia/intro/
// https://developers.google.com/web/fundamentals/media/capturing-images/
// https://tutorialzine.com/2016/07/take-a-selfie-with-js
// create a modal dialog like this one, with 3 buttons: delete, take-selfie, I need another canvas to save the img for users to take action
// if you are satisfied, I'd copy the img to editing canvs, if not, you can take another one.
const Selfie = props => (
  <div id='modal-camera'>
    <div>camera here, or error msg, with a close button</div>
  </div>
);

