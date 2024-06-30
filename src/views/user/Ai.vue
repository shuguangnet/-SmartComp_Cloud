<!--  -->
<template>
  <div style="width: 100%; height: 80vh;">
    <iframe
      src="http://222.186.56.232:8080/ui/chat/4e57f91dccd39b1c"
      style="width: 100%; height: 100%;"
      frameborder="0"
      allow="microphone"
    ></iframe>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  name: 'ChatGPTPage',
  data() {
    return {
      message: '',
      chatHistory: [
        { message: '欢迎使用竞赛AI助手！', sentByUser: false },
      ],
      socket: null,
    };
  },
  mounted() {
    this.initializeWebSocket();
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();  // 关闭 WebSocket 连接
    }
  },
  methods: {
    initializeWebSocket() {
      this.socket = new WebSocket(`ws://222.186.56.183:8888/websocketClient/3`);
      this.socket.onopen = () => {
        console.log('WebSocket 连接已建立');
      };
					this.socket.onmessage = (event) => {
				  console.log('收到消息:', event.data);
					this.updateChatHistory(event.data, false)
					// var str=""
					// str=str+event.data
					// console.log(str);
					// 定时器3秒后统一发出


				};
				// setInterval(() => {this.updateChatHistory(str, false);},3000)

      this.socket.onerror = (error) => {
        console.error('WebSocket 错误:', error);
      };
      this.socket.onclose = () => {
        console.log('WebSocket 连接已关闭');
      };
    },
    sendMessage() {
      const data = { session: this.message };
      console.log('发送消息：', JSON.stringify(data));
      this.updateChatHistory(this.message, true);
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(data));
      }
      this.message = '';
    },
    updateChatHistory(msg, sentByUser) {
  if (msg) {
    // 如果收到的消息不为空，则将其添加到聊天历史中
    this.chatHistory.push({ message: msg, sentByUser });
  } else {
    // 如果收到的消息为空，则表示回答完成
    // 将回答的内容合并并添加到聊天历史中
    let answer = '';
    for (const entry of this.chatHistory) {
      answer += entry.message;
    }
    this.chatHistory.push({ message: answer, sentByUser });
    // 清空聊天历史
    // this.chatHistory = [];
  }
}
  },
};
</script>
<style scoped>
.container {
  overflow-y: auto;
  max-height: 7rem;
}
/* 可以在这里添加样式来自定义页面外观 */
.logo {
	display: flex;
	flex-direction: row;
	justify-content: center;
  font-size: 24px;
  color: #333;
  padding: 16px;
}
.sidebar {
  padding: 16px;
}
.chat-content {
  padding: 16px;
}
.input-box {
  padding: 16px;
}
.send {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
</style>
