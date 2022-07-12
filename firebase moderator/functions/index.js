const functions = require("firebase-functions");
const capitalizeSentence = require("capitalize-sentence");
const Filter = require("bad-words");
const badWordsFilter = new Filter();

// Moderates messages by lowering all uppercase messages and removing swearwords.
exports.moderator = functions.database
  .ref("{eventId}//messages/{timestamp}")
  .onWrite((change) => {
    const message = change.after.val();

    if (message && !message.sanitized) {
      // Retrieved the message values.
      functions.logger.log("Retrieved message content: ", message);

      // Run moderation checks on on the message and moderate if needed.
      const moderatedMessage = moderateMessage(message.text);

      // Update the Firebase DB with checked message.
      functions.logger.log(
        "Message has been moderated. Saving to DB: ",
        moderatedMessage
      );
      return change.after.ref.update({
        text: moderatedMessage,
        sanitized: true,
        moderated: message.text !== moderatedMessage,
      });
    }
    return null;
  });

// Moderates the given message if appropriate.
function moderateMessage(message) {

  
  if(hasCharacters(message)){

    functions.logger.log("User is type Fixing sentence case...");
    // Re-capitalize if the user is Shouting.
    if (isShouting(message)) {
      functions.logger.log("User is shouting. Fixing sentence case...");
      message = stopShouting(message);
    }
    
    // Moderate if the user uses SwearWords.
    if (containsSwearwords(message)) {
      functions.logger.log("User is swearing. moderating...");
      message = moderateSwearwords(message);
    }
    
    if (isUrl(message)) {
      functions.logger.log("User is using a url. moderating...");
      message = '****';
      console.log(message);
    }
    if (isAnEmoji(message)) {
      functions.logger.log("User is using an emoji. moderating...");
      message = message.concat(" ")
      console.log(message);
    }
    
  }



  return message;
}

// Returns true if the string contains swearwords.
function containsSwearwords(message) {
  return message !== badWordsFilter.clean(message);
}

// Hide all swearwords. e.g: Crap => ****.
function moderateSwearwords(message) {
  return badWordsFilter.clean(message);
}

// Detect if the current message is shouting. i.e. there are too many Uppercase
// characters or exclamation points.
function isShouting(message) {
  console.log(message);
  return (
    message.replace(/[^A-Z]/g, "").length > message.length / 2 ||
    message.replace(/[^!]/g, "").length >= 3
  );
}

// Correctly capitalize the string as a sentence (e.g. uppercase after dots)
// and remove exclamation points.
function stopShouting(message) {
  return capitalizeSentence(message.toLowerCase()).replace(/!+/g, ".");
}


//Check if the message is a url

//check if a string has an url
function isUrl(message) {

  return message.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/i);
}


//Check if the message has an emoji
function isAnEmoji(message) {

  return message.match(/\p{Emoji}/u);
}

//Has characters
function hasCharacters(message) {
  return message.match(/\p{Letter}/u);
}