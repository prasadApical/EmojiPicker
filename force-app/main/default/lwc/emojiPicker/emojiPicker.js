/**
 * Author: Apical Cloud Soltutions Ltd.
 * Developer: Prasad Rajaram Kumawat
 * Application: Emoji Picker with GIF Integration
 * Created Date: 2024-06-21
 * Modified Date: 2024-06-21
 * Description: This JavaScript file handles the logic for the Emoji Picker component,
 *              including the integration with the Giphy API for GIF search and selection.
 * 
 * Copyright © 2024 Apical Cloud Solutions Ltd.
 * All rights reserved. No part of this code may be reproduced, distributed, or transmitted
 * in any form or by any means, including photocopying, recording, or other electronic or mechanical methods,
 * without the prior written permission of the owner.
 * 
 */
import { LightningElement, track, api } from 'lwc';
import searchGiphy from '@salesforce/apex/GiphyService.searchGiphy';

import { loadStyle } from 'lightning/platformResourceLoader';
import emojiPickerResource from '@salesforce/resourceUrl/EmojiPicker';


export default class EmojiPicker extends LightningElement {
    @api label = 'Emoji Picker'; // Default title if not provided
    @api isRequired = false; // Default to false
    @api value = ''; // Exposed to flow
    @track inputValue = '';
    @track showEmojiPicker = false;
    @track currentEmojis = [];
    @track selectedCategory = 'SmileysAndEmotion';
    @track isGifTab = false;
    @track searchQuery = '';
    @track listGifs = [];
    @track apicalLogo = emojiPickerResource + '/images/apicalLogo.png';

    savedRange; // Property to store the selection range

    symbols =  ['❤️', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '🔥', '🩹', '💯', '♨️', '💢', '❗️', '❕', '❓', '❔', '⁉️', '💬', '👁️', '🗨️', '🗯️', '💭', '💤'];
    objects =  ['🔨', '🪓', '⛏️', '⚒️', '🛠️', '🗡️', '⚔️', '🔧', '🔩', '⚙️', '🗜️', '⚖️', '🦯', '🔗', '⛓️', '🧰', '🧲', '⚗️', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '✉️', '💌', '📧', '📨', '📩', '📤', '📥', '📦', '📫', '📪', '📬', '📭', '📮', '🗳️', '✏️', '✒️', '🖋️', '🖊️', '🖌️', '🖍️', '📝', '💼', '📁', '📂', '🗂️', '📅', '📆', '🗒️', '🗓️', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '🖇️', '📏', '📐', '✂️', '🗃️', '🗄️', '🗑️'];
    activities =  ['⚽️', '⚾️', '🥎', '🏀', '🏐', '🏈', '🏉', '🎾', '🥏', '🎳', '🏏', '🏑', '🏒', '🥍', '🏓', '🏸', '🥊', '🥋', '🥅', '⛳️', '⛸️', '🎣', '🤿', '🎽', '🎿', '🛷', '🥌', '🎯', '🪀', '🪁', '🎱', '♟️', '🧩', '🧸', '🎮', '🕹️', '🎰', '🎲'];
    animalsAndNature =  ['🐵', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', '🦺', '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '⬛', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️', '🦔', '🦇', '🐻', '❄️', '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', '🕊️', '🦅', '🦆', '🦢', '🦉', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🐟', '🐠', '🐡', '🦈', '🐙', '🦑', '🦀', '🦞', '🦐', '🦪', '🐚', '🐌', '🦋', '🐛', '🐜', '🐝', '🐞', '🦗', '🕷️', '🕸️', '🦂', '🦟', '🦠', '💐', '🌸', '💮', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🎋', '🎍', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃'];
    foodAndDrink =  ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝', '🍅', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🫑', '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜', '🌰', '🍞', '🥐', '🥖', '🫓', '🥨', '🥯', '🥞', '🧇', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🫔', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🫕', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '🥛', '☕️', '🫖', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🥤', '🧋', '🧃', '🧉', '🧊', '🥢', '🍽️', '🍴', '🥄'];
    travelAndPlaces =  ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬', '🛩️', '💺', '🛰️', '🚀', '🛸', '🚁', '🛶', '⛵️', '🚤', '🛳️', '⛴️', '🛥️', '🚢', '⚓️', '🪝', '🗺️', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲️', '⛱️', '🏖️', '🏝️', '🏜️', '🌋', '⛰️', '🏔️', '🗻', '🏕️', '🏠', '🏡', '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '💒', '🏛️', '⛪️', '🕌', '🛕', '🕍', '🕋', '🛻', '🦽', '🦼', '🛹', '🛼', '🛷', '⛷️', '🏂', '🪂', '🏋️', '♀️', '♂️', '⛹️', '🤺', '🤼', '🤸', '🏌️', '🏄', '🚣', '🏊', '🚴', '🚵', '🤹'];
    smileysAndEmotion =  ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '😮', '💨', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🌫️', '🥴', '😵', '💫', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄', '💋'];
    flags= ['🏳️', '🏁', '🚩', '🎌', '🏴', '🌈', '⚧️', '☠️', '🇦🇨', '🇦🇩', '🇦🇪', '🇦🇫', '🇦🇬', '🇦🇮', '🇦🇱', '🇦🇲', '🇦🇴', '🇦🇶', '🇦🇷', '🇦🇸', '🇦🇹', '🇦🇺', '🇦🇼', '🇦🇽', '🇦🇿', '🇧🇦', '🇧🇧', '🇧🇩', '🇧🇪', '🇧🇫', '🇧🇬', '🇧🇭', '🇧🇮', '🇧🇯', '🇧🇱', '🇧🇲', '🇧🇳', '🇧🇴', '🇧🇶', '🇧🇷', '🇧🇸', '🇧🇹', '🇧🇻', '🇧🇼', '🇧🇾', '🇧🇿', '🇨🇦', '🇨🇨', '🇨🇩', '🇨🇫', '🇨🇬', '🇨🇭', '🇨🇮', '🇨🇰', '🇨🇱', '🇨🇲', '🇨🇳', '🇨🇴', '🇨🇵', '🇨🇷', '🇨🇺', '🇨🇻', '🇨🇼', '🇨🇽', '🇨🇾', '🇨🇿', '🇩🇬', '🇩🇯', '🇩🇰', '🇩🇲', '🇩🇴', '🇩🇿', '🇪🇦', '🇪🇨', '🇪🇪', '🇪🇬', '🇪🇭', '🇪🇷', '🇪🇸', '🇪🇹', '🇪🇺', '🇫🇮', '🇫🇯', '🇫🇰', '🇫🇲', '🇫🇴', '🇫🇷', '🇬🇦', '🇬🇧', '🇬🇩', '🇬🇪', '🇬🇫', '🇬🇬', '🇬🇭', '🇬🇮', '🇬🇱', '🇬🇲', '🇬🇳', '🇬🇵', '🇬🇶', '🇬🇷', '🇬🇸', '🇬🇹', '🇬🇺', '🇬🇼', '🇬🇾', '🇭🇰', '🇭🇲', '🇭🇳', '🇭🇷', '🇭🇹', '🇭🇺', '🇮🇨', '🇮🇩', '🇮🇪', '🇮🇱', '🇮🇲', '🇮🇳', '🇮🇴', '🇮🇶', '🇮🇷', '🇮🇸', '🇮🇹', '🇯🇪', '🇯🇲', '🇯🇴', '🇯🇵', '🇰🇪', '🇰🇬', '🇰🇭', '🇰🇮', '🇰🇲', '🇰🇳', '🇰🇵', '🇰🇷', '🇰🇼', '🇰🇾', '🇰🇿', '🇱🇦', '🇱🇧', '🇱🇨', '🇱🇮', '🇱🇰', '🇱🇷', '🇱🇸', '🇱🇹', '🇱🇺', '🇱🇻', '🇱🇾', '🇲🇦', '🇲🇨', '🇲🇩', '🇲🇪', '🇲🇫', '🇲🇬', '🇲🇭', '🇲🇰', '🇲🇱', '🇲🇲', '🇲🇳', '🇲🇴', '🇲🇵', '🇲🇶', '🇲🇷', '🇲🇸', '🇲🇹', '🇲🇺', '🇲🇻', '🇲🇼', '🇲🇽', '🇲🇾', '🇲🇿', '🇳🇦', '🇳🇨', '🇳🇪', '🇳🇫', '🇳🇬', '🇳🇮', '🇳🇱', '🇳🇴', '🇳🇵', '🇳🇷', '🇳🇺', '🇳🇿', '🇴🇲', '🇵🇦', '🇵🇪', '🇵🇫', '🇵🇬', '🇵🇭', '🇵🇰', '🇵🇱', '🇵🇲', '🇵🇳', '🇵🇷', '🇵🇸', '🇵🇹', '🇵🇼', '🇵🇾', '🇶🇦', '🇷🇪', '🇷🇴', '🇷🇸', '🇷🇺', '🇷🇼', '🇸🇦', '🇸🇧', '🇸🇨', '🇸🇩', '🇸🇪', '🇸🇬', '🇸🇭', '🇸🇮', '🇸🇯', '🇸🇰', '🇸🇱', '🇸🇲', '🇸🇳', '🇸🇴', '🇸🇷', '🇸🇸', '🇸🇹', '🇸🇻', '🇸🇽', '🇸🇾', '🇸🇿', '🇹🇦', '🇹🇨', '🇹🇩', '🇹🇫', '🇹🇬', '🇹🇭', '🇹🇯', '🇹🇰', '🇹🇱', '🇹🇲', '🇹🇳', '🇹🇴', '🇹🇷', '🇹🇹', '🇹🇻', '🇹🇼', '🇹🇿', '🇺🇦', '🇺🇬', '🇺🇲', '🇺🇳', '🇺🇸', '🇺🇾', '🇺🇿', '🇻🇦', '🇻🇨', '🇻🇪', '🇻🇬', '🇻🇮', '🇻🇳', '🇻🇺', '🇼🇫', '🇼🇸', '🇽🇰', '🇾🇪', '🇾🇹', '🇿🇦', '🇿🇲', '🇿🇼'];

    categoryEmojis = {
        SmileysAndEmotion: this.smileysAndEmotion,
        PeopleAndBody: this.peopleAndBody,
        Symbols: this.symbols,
        AnimalsAndNature: this.animalsAndNature,
        FoodAndDrink: this.foodAndDrink,
        Activities: this.activities,
        TravelAndPlaces: this.travelAndPlaces,
        Objects: this.objects,
        Flags: this.flags
    };

    connectedCallback() {
        this.currentEmojis = this.categoryEmojis[this.selectedCategory];
        loadStyle(this, emojiPickerResource + '/css/EmojiPicker.css')
            .then(() => {
                console.log('Styles loaded successfully.');
            })
            .catch(error => {
                console.error('Error loading styles:', error);
            });
    }

    renderedCallback() {
        const richTextArea = this.template.querySelector('lightning-input-rich-text');
        if (richTextArea && !this._listenersAdded) {
            // Listen for selection changes
            richTextArea.addEventListener('mouseup', this.saveSelection.bind(this));
            richTextArea.addEventListener('keyup', this.saveSelection.bind(this));
            this._listenersAdded = true;
        }
    }

    handleTextChange(event) {
        this.inputValue = event.target.value;
        // console.log('Input value:', this.inputValue);
        this.value = this.inputValue;
        // Dispatch event so flow receives the update
        //this.dispatchEvent(new FlowAttributeChangeEvent('value', this.value));
    }

    toggleEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
    }

    closeEmojiPicker() {
        this.showEmojiPicker = false;
    }

    preventClose(event) {
        event.stopPropagation();
    }

    handleTabClick(event) {
        const category = event.target.dataset.category;
        this.selectedCategory = category;
        if (category === 'Gifs') {
            this.isGifTab = true;
        } else {
            this.isGifTab = false;
            this.currentEmojis = this.categoryEmojis[category];
        }
    }


    saveSelection() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            this.savedRange = selection.getRangeAt(0);
        }
    }
    
    restoreSelection() {
        if (this.savedRange) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(this.savedRange);
        }
    }
    

    handleEmojiClick(event) {
        const emoji = event.target.textContent;
        const richTextArea = this.template.querySelector('lightning-input-rich-text');
        richTextArea.focus();
        // Restore the saved caret position
        this.restoreSelection();
      
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            // Remove any selected content
            range.deleteContents();
            // Create a text node with the emoji
            const textNode = document.createTextNode(emoji);
            // Insert the emoji at the caret position
            range.insertNode(textNode);
            // Move the caret right after the inserichTextAread emoji
            range.setStartAfter(textNode);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            // Optionally update savedRange with the new caret position
            this.savedRange = range;
        }
    }
    

    handleGifClick(event) {
        const gifUrl = event.target.src;
        this.inputValue += `<img src="${gifUrl}" alt="GIF"/>`;
        //this.showEmojiPicker = false;

        // Update the value of the rich text field
        this.template.querySelector('lightning-input-rich-text').value = this.inputValue;
    }

    handleSearchChange(event) {
        this.searchQuery = event.target.value;
    }

    async searchGifs() {
        try {
            const response = await searchGiphy({ strQuery: this.searchQuery });
            this.listGifs = JSON.parse(response).data;
        } catch (error) {
            console.error('Error fetching GIFs:', error);
        }
    }
    
    get firstSmileyAndEmotion() {
        return this.smileysAndEmotion[0];
    }

    get firstSymbol() {
        return this.symbols[0];
    }

    get firstAnimalAndNature() {
        return this.animalsAndNature[0];
    }

    get firstFoodAndDrink() {
        return this.foodAndDrink[0];
    }

    get firstActivity() {
        return this.activities[0];
    }

    get firstTravelAndPlace() {
        return this.travelAndPlaces[0];
    }

    get firstObject() {
        return this.objects[0];
    }

    get firstFlag() {
        return this.flags[0];
    }

    @api
    validate() {
        if (this.isRequired && !this.inputValue) {
            // Return the error format expected by Flow or Parent Component
            return {
                isValid: false,
                errorMessage: 'Please fill the required field.'
            };
        }
        return { isValid: true };
    }

}