
<div className="container">
	<div className="row">
		<h3 className="col-lg-10">Click on the button below to get in invite to slack for {email}</h3>
		<div className="col-lg-2">
			<button id="join" className="btn btn-primary">
				Join
			</button>
		</div>
	</div>
	<div id="slack-response" className="row"></div>
</div>

<script>
	$('button#join').click(function (event) {
		event.preventDefault();
		socket.emit('plugins.slack.invite', null, function (err, data) {
			if (err && !data) {
				$('#slack-response').html('<h4>Failure to talk to slack servers</h>');
				return;
			}
			if (!data.ok) {
				$('#slack-response').html('<h4>Slack says ' + data.error + ' error</h>');
			} else {
				$('#slack-response').html('<h4>Success!  Please check your email for an invite from Slack</h>');
			}
		});
	});
</script>