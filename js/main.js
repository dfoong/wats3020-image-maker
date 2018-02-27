/* WATS 3020 Image Maker Code */

//////////////////////////////////////////////////
// ImageMaker Class Definition               /////
////////////////////////////////////////////////////////////////////////
// This class is used to manage the image manipulation and prep on    //
// the page. It is instantiated when the page is loaded, and it       //
// handles all the logic of updating the image preview with the data  //
// submitted by users via the image maker form.                       //
////////////////////////////////////////////////////////////////////////

class ImageMaker {
    constructor(){
        // When this class is instantiated, the `constructor()` method is executed.

        this.imagePreview = document.getElementById('image-preview');

        // DF: P text element for top caption.
        this.topText = document.createElement('p');
                                                    
        // DF: top-text as a class
      this.topText.setAttribute('class','top-text');

        // TODO: Append `this.topText` as a child element to `this.imagePreview`
      this.imagePreview.appendChild(this.topText);

        // DF: P text element for bottom caption.
        this.bottomText = document.createElement('p');
      
      this.bottomText.setAttribute('class', 'bottom-text');
      
      // DF: bottomText is appended as a child element to imagePreview.
      this.imagePreview.appendChild(this.bottomText);

        //DF: form fields for user input. Background, top caption, bottom caption.
      //DF: Query selector selects the class or element you specified earlier.

        this.backgroundInput = document.querySelector('select[name="backgroundImage"]');

        this.topTextInput = document.querySelector('input[name="topText"]');

        this.bottomTextInput = document.querySelector('input[name="bottomText"]');

        // NOTE: If you add additional form fields to modify other aspects of
        // the image, then you will need to make attributes for each of those
        // elements here.
    }
    drawPreview(){
        // DF: Background image is based on user selection. Algebra substitution method for '.value'
      this.imagePreview.style.backgroundImage =  `url(images/${this.backgroundInput.value})`

        // DF: User specified text for meme top, is set as the .value
      this.topText.innerHTML = this.topTextInput.value;

        //  DF: User specified text for meme bottom, is set as the .value
      this.bottomText.innerHTML = this.bottomTextInput.value;


    }
    downloadImage(){
        this.drawPreview();
        generateImage();
    }
}

let imageMaker = new ImageMaker();

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID="image-preview", height="800px", width="1280px"){
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}


// This function creates event listeners for each every form field added to
// the image maker form as well as the submit button that generates an image
// for download. New form inputs can be created and will automatically have
// a "change" listener added to them.
//
// The form field listeners look for a "change" event and call the
// `imageMaker.drawPreview()` method.
//
// The submit listener on the form interrupts the regular form processing of the
// browser and calls the `imageMaker.downloadImage()` method.
function applyEventListeners(){
    let inputs = document.querySelectorAll('input, select, textarea');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.downloadImage();
    })
}

// Apply event listeners on page load.
applyEventListeners();
