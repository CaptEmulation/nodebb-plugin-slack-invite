<form id="slack-settings" action="/slack/invite">
	<div class="form-group">
    <label for="slackUrl">Slack URL</label>
    <input type="text" class="form-control" id="slackUrl" data-key="slack.url" placeholder="slack url, e.g. your-team.slack.com">
  </div>
	<div class="form-group">
    <label for="slackToken">Slack URL</label>
    <input type="text" class="form-control" id="slackToken" placeholder="slack API token" data-key="slack.token">
  </div>
  <div class="form-group">
    <label for="offerInviteOnJoin">Offer slack invite on join</label>
    <input id="offerInviteOnJoin" type="checkbox" data-key="feature.inviteOnJoin"></input>
  </div>
  <button class="btn btn-lg btn-warning" id="reset">Reset</button>
  <button class="btn btn-lg btn-primary" id="save">Save</button>
</form>

<script>
    require(['settings'], function (settings) {
        var wrapper = $('#slack-settings');
        // [1]
        settings.sync('slack', wrapper);
        $('#save').click(function(event) {
            event.preventDefault();
            settings.persist('slack', wrapper, function(){
                socket.emit('admin.settings.syncSlack');
            });
        });
        $('#reset').click(function(event) {
            event.preventDefault();
            socket.emit('admin.settings.getSlackDefaults', null, function (err, data) {
                settings.set('slack', data, wrapper, function(){
                    socket.emit('admin.settings.getSlackDefaults');
                });
            });
        });
      });
</script>