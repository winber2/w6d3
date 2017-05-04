const APIUtil = require ('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor($el) {
    this.el = $el;
    this.input = $el.find('input');
    this.ul = $el.find('ul');
    this.handleInput();
  }

  handleInput() {
    let search = this;
    this.input.on('keyup', (e) => {
      e.preventDefault();
      APIUtil.searchUsers(this.input.val(), this.renderResults.bind(search));
    });
  }

  renderResults(users) {
    let $ul = this.ul;
    $ul.empty();
    users.forEach( (user, index) => {
      let $li = $(`<li></li>`);
      let $a = $(`<a>${user.username}</a>`);
      let $button = $('<button></button>');
      let options = {};
      $button.addClass('follow-toggle');

      if (user.followed) {
        options['id'] = user.id;
        options['followState'] = 'followed';
      } else {
        options ['id'] = user.id;
        options['followState'] = 'unfollowed';
      }

      new FollowToggle($button, options);
      $a.attr('href', `/users/${user.id}`);
      $li.append($a).append($button);
      $ul.append($li);
    });
  }
}

module.exports = UsersSearch;
