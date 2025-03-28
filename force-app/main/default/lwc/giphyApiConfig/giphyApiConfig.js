/**
 * @author Atul Chopade [Apical Cloud Solutions Ltd.]
 * @date 04 Mar 2025
 * @description LWC Controller for Api key and How to Use App Page
 */
import { LightningElement, track } from 'lwc';

// Import ShowToastEvent method from platformShowToastEvent
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Import loadStyle method from platformResourceLoader
import { loadStyle } from 'lightning/platformResourceLoader';


// Import Apex methods from Controller
import saveGiphyApiKey from '@salesforce/apex/GiphyApiKeyController.saveGiphyApiKey';

// Import JS files, CSS & Images from static resources
import EmojiPicker from '@salesforce/resourceUrl/EmojiPicker';


export default class GiphyApiConfig extends LightningElement {
@track strApiKey ='';    // for storing the api key
image1 = this.getImageUrl('Image1.png');
image2 = this.getImageUrl('Image2.png');
image3 = this.getImageUrl('Image3.png');
image4 = this.getImageUrl('Image4.png');
image5 = this.getImageUrl('Image5.png');
image6 = this.getImageUrl('Image6.png');
image7 = this.getImageUrl('Image7.png');
image8 = this.getImageUrl('Image8.png');
image9 = this.getImageUrl('Image9.png');
image10 = this.getImageUrl('Image10.png');
image11 = this.getImageUrl('Image11.png');
image12 = this.getImageUrl('Image12.png');


getImageUrl(imageName) {
    return `${EmojiPicker}/images/SetupImages/${imageName}`;
}

    /**
     * @descripton Connected callback to load the styles
     */
connectedCallback() {
    // Load styles
    Promise.all([
        loadStyle(this, EmojiPicker + '/css/EmojiPickerSetup.css')
    ]);
}

/**
 * @description Method to handle the change in the input field
 */
handleInputChange(event) {
    this.strApiKey = event.target.value;
    }

    handleSave() {
        saveGiphyApiKey({ strApiKey: this.strApiKey })
            .then(() => {
                this.showToast('Success', 'API Key saved successfully', 'success');
                this.strApiKey = ''; // Clear input field
            })
            .catch(error => {
                this.showToast('Error', 'Failed to save API Key', 'error');
                console.error(error);
            });
    }

    /**
     * @description Method to open the link in new tab
     */
    openReferenceLink() {
        window.open('https://developers.giphy.com/docs/api#quick-start-guide', '_blank');
    }

    /**
     * @description Method to show message
     * @param {String} title Title of the message window
     * @param {String} message Actual message to display to user
     * @param {String} variant Type of message
     */
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

}