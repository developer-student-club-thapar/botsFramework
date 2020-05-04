from slacker import Slacker

message="sdhusdvh"

slack = Slack (Slack_token)
slack.chat.post_message(Slack_Channel, message )
slack.chat.command(
    channel=Slack_Channel_ID,
    command="/poll",
    text="Is this a hackathon link?" "Sure" "Hell No!"
    )
