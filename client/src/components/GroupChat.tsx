import React, { useEffect, useState } from "react";
import * as ethers from "ethers";
//@ts-ignore
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

export default function GroupChat() {
  const [addressInput, setAddressInput] = useState("");
  const [formattedAddresses, setFormattedAddresses] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [groupChatHistory, setGroupChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  const [groupChatId, setGroupChatId] = useState(
    "0790476d43cbec0dc1449761b7df0c2bf7c5005ddecc4d5298193be5f95c32c4"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setAddressInput(input);

    // Split the input by commas, trim each address, and surround with double quotes
    const formatted = input
      .split(",")
      .map((address) => `${address.trim()}`)
      .join(",");
    setFormattedAddresses(formatted);
  };

  const renderChatHistory = () => {
    return chatHistory.map((message: any, index) => (
      <div key={index}>{message.content}</div>
    ));
  };

  const renderGroupChatHistory = () => {
    return groupChatHistory.map((message: any, index) => (
      <div key={index}>{message.content}</div>
    ));
  };

  const handleSendMessage = async () => {
    // if (selectedChat) {
    sendMessage(groupChatId, newMessage);
    setNewMessage("");
    // }
  };

  // const handleAcceptMessage = async (chatId: string) => {
  //   acceptMessage(chatId);
  // };

  // useEffect(() => {
  //   if (selectedChat) {
  //     fetchGroupChatHistory(selectedChat);
  //   }
  // }, [selectedChat]);

  const createGroup = async (groupName: any) => {
    try {
      // console.log(walletAddresses);
      const user = await getPushUser();
      //@ts-ignore
      const newGroup = await user.chat.group.create(groupName, {
        description: "Group Description",
        image: "groupImage",
        members: [
          // "0x8EA809076374708aEF0d6e9C3F0a7A64CAD17368",
          "0xF776c57B14A029794c21538a54b4Cbdc1978aF82",
          "0x8832fe66Aa71D7446175ecd3B1E133B1Eb252562",
        ],
        admins: [],
        private: false,
      });

      setGroupChatId(newGroup.chatId);

      console.log(newGroup.chatId);
    } catch (e) {
      console.log(e);
    }
  };

  const joinGroup = async (groupChatId: any) => {
    try {
      const user = await getPushUser();
      //@ts-ignore
      const joinGroup = await user.chat.group.join(groupChatId);
      console.log(joinGroup);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const user = await getPushUser();
      //@ts-ignore
      const aliceChats = await user.chat.list("CHATS");
      console.log(aliceChats);
    } catch (e) {
      console.log(e);
    }
  };

  const getPushUser = async () => {
    try {
      //@ts-ignore
      const { ethereum } = window;
      const pv = new ethers.providers.Web3Provider(ethereum);
      const signer = pv.getSigner();
      const ps = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.STAGING,
      });

      // const dada = await ps.chat.group.create("Name");
      // console.log(dada);
      return ps;
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (bobAccount: any, message: any) => {
    //bobAccount can be wallet address or group chat id
    try {
      const user = await getPushUser();
      //@ts-ignore
      const aliceMessagesBob = await user.chat.send(bobAccount, {
        type: "Text",
        content: message,
      });
      console.log(aliceMessagesBob);
    } catch (e) {
      console.log(e);
    }
  };

  const acceptMessage = async (aliceAddress: any) => {
    //bobAccount can be wallet address or group chat id
    try {
      const user = await getPushUser();
      //@ts-ignore
      const bobAcceptAliceRequest = await user.chat.accept(aliceAddress);
      console.log(bobAcceptAliceRequest);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchGroupChatHistory = async (chatId: any) => {
    try {
      const pushUser = await getPushUser();
      // setPushUser(pushUser);

      const his = await pushUser?.chat.history(chatId, { limit: 20 });
      console.log(his);
      // setChatHistory(his);

      const stream = await pushUser?.initStream([CONSTANTS.STREAM.CHAT], {
        filter: {
          chats: [chatId],
        },
        connection: {
          retries: 3,
        },
        raw: false,
      });

      stream?.on(CONSTANTS.STREAM.CHAT, async (data: any) => {
        const his = await pushUser?.chat.history(chatId, { limit: 20 });
        console.log(his);
        // setChatHistory(his);
      });
      stream?.connect();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={addressInput}
          onChange={handleInputChange}
          placeholder="address1,address2,..."
        />
        <button
          onClick={() => {
            createGroup("Harsh Ka Group");
          }}
        >
          Create Group
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            fetchChatHistory();
          }}
        >
          Fetch Chat History
        </button>
        <button
          onClick={() => {
            fetchGroupChatHistory(groupChatId);
          }}
        >
          Fetch Group Chat History
        </button>
      </div>

      <div>
        <div>
          {/* {selectedChat && ( */}
          <>
            <div>{renderGroupChatHistory()}</div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send Message</button>
          </>
          {/* )} */}
        </div>

        {/* <div>
          <button
            onClick={() => {
              handleAcceptMessage("0x8602784e3aE5079FdF53b1F4e6ae58D7aa1b6E15");
            }}
          >
            Accept Message
          </button>
        </div> */}
      </div>
    </div>
  );
}
