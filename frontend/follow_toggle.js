const APIUtil = require ('./api_util.js');

class FollowToggle {
  constructor($el, options) {
    this.el = $el;
    this.userId = $el.data('user-id') || options.id;
    this.followState = $el.data('initial-follow-state') || options.followState;
    this.render();
    this.handleClick();
  }

  render() {
    if (this.followState === "unfollowed") {
      this.el.text('Follow!');
      this.el.prop('disabled', false);
    } else if (this.followState === "followed") {
      this.el.text('Unfollow!');
      this.el.prop('disabled', false);
    } else {
      this.el.attr('disabled', true);
    }
  }

  handleClick() {
    let button = this;
    this.el.on("click", (e) => {
      e.preventDefault();

      if (this.followState === "followed") {
        this.followState = "unfollowing";
        this.render();
        APIUtil.unfollowUser(this.userId)
          .then(this.removeFollow.bind(button));
      } else {
        this.followState = "following";
        this.render();
        APIUtil.followUser(this.userId)
          .then(this.createFollow.bind(button));
      }
    });
  }

  createFollow() {
    this.followState = "followed";
    this.render();
  }

  removeFollow() {
    this.followState = "unfollowed";
    this.render();
  }


}

module.exports = FollowToggle;
