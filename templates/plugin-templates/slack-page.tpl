
<div className="container" id="slack-content">
  <div className="row">
		<h3 className="col-lg-10">Joining slack....  </h3>
	</div>
  <div id="slack-response" className="row"></div>
</div>

<script>
  socket.emit('plugins.slack.invite', null, function (err, data) {
    if (err && !data) {
      $('#slack-response').html('<h4>Failure to talk to slack servers</h>');
      return;
    }
    if (!data.ok && data.error === 'already_invited') {
      $('#slack-response').html('<h4>Slack says you are already invited, please check {email}</h>');
    } if (!data.ok && data.error === 'already_in_team') {
      $('#slack-response').html('<h4>Slack says you are already a team member, please check visit <a href="https://texascoc.slack.com">texascoc.slack.com</a></h>');
    } else if (data.ok) {
      $('#slack-response').html('<h4>Success!  Please check your email for an invite from Slack</h>');
    }
  });
</script>