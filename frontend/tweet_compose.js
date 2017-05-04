const APIUtil = require ('./api_util.js');

class TweetCompose {
  constructor($el) {
    this.el = $el;
    this.content = $el.find('textarea');
    this.select = $el.find('select');
    this.input = $el.find('input:last-child');
    this.chars = $el.find('strong.chars-left');
    this.handleSubmit();
    this.charsLeft();
  }

  handleSubmit() {
    this.input.on("click", (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  charsLeft() {
    this.content.on('input', () => {
      let chars = this.content.val().length;
      this.chars.text(`${140 - chars}`);
    });
  }

  submit() {
    let data = this.el.serializeJSON();
    let compose = this;
    APIUtil.createTweet(data)
      .then( (tweet) => this.handleSuccess(tweet))
      .always( () => compose.input.prop('disabled', false));
    this.input.attr('disabled', true);
  }

  clearInput() {
    this.content.val('');
    this.select.val('none');
    this.chars.text('140');
  }

  handleSuccess(tweet) {
    let $li = $(`<li>${tweet.content} -- ${tweet.user.username} -- ${tweet.created_at}</li>`);
    let $mention = $(`<ul><li>${tweet.mentions[0].user.username}</li></ul>`);
    $li.append($mention);
    $('ul#feed').append($li);
    this.clearInput();
  }

}

module.exports = TweetCompose;
