import{_ as s,c as e,o as n,a2 as t}from"./chunks/framework.DDIT__tB.js";const u=JSON.parse('{"title":"Voice agents","description":"","frontmatter":{},"headers":[],"relativePath":"docs/openai/guides/voice-agents.md","filePath":"docs/openai/guides/voice-agents.md","lastUpdated":1748071461000}'),i={name:"docs/openai/guides/voice-agents.md"};function o(p,a,l,r,c,h){return n(),e("div",null,a[0]||(a[0]=[t(`<h1 id="voice-agents" tabindex="-1">Voice agents <a class="header-anchor" href="#voice-agents" aria-label="Permalink to &quot;Voice agents&quot;">​</a></h1><p>Learn how to build voice agents that can understand audio and respond back in natural language.</p><p>Use the OpenAI API and Agents SDK to create powerful, context-aware voice agents for applications like customer support and language tutoring. This guide helps you design and build a voice agent.</p><h2 id="choose-the-right-architecture" tabindex="-1">Choose the right architecture <a class="header-anchor" href="#choose-the-right-architecture" aria-label="Permalink to &quot;Choose the right architecture&quot;">​</a></h2><p>OpenAI provides two primary architectures for building voice agents:</p><p>[</p><p><img src="https://cdn.openai.com/API/docs/images/blue_card.png" alt="Speech-to-Speech"></p><p>Speech-to-Speech</p><p>Native audio handling by the model using the Realtime API</p><p>](/docs/openai/guides/voice-agents?voice-agent-architecture=speech-to-speech)[</p><p><img src="https://cdn.openai.com/API/docs/images/orange_card.png" alt="Chained"></p><p>Chained</p><p>Transforming audio to text and back to use existing models</p><p>](/docs/openai/guides/voice-agents?voice-agent-architecture=chained)</p><h3 id="speech-to-speech-realtime-architecture" tabindex="-1">Speech-to-speech (realtime) architecture <a class="header-anchor" href="#speech-to-speech-realtime-architecture" aria-label="Permalink to &quot;Speech-to-speech (realtime) architecture&quot;">​</a></h3><p><img src="https://cdn.openai.com/API/docs/images/diagram-speech-to-speech.png" alt="Diagram of a speech-to-speech agent"></p><p>The multimodal speech-to-speech (S2S) architecture directly processes audio inputs and outputs, handling speech in real time in a single multimodal model, <code>gpt-4o-realtime-preview</code>. The model thinks and responds in speech. It doesn&#39;t rely on a transcript of the user&#39;s input—it hears emotion and intent, filters out noise, and responds directly in speech. Use this approach for highly interactive, low-latency, conversational use cases.</p><table tabindex="0"><thead><tr><th>Strengths</th><th>Best for</th></tr></thead><tbody><tr><td>Low latency interactions</td><td>Interactive and unstructured conversations</td></tr><tr><td>Rich multimodal understanding (audio and text simultaneously)</td><td>Language tutoring and interactive learning experiences</td></tr><tr><td>Natural, fluid conversational flow</td><td>Conversational search and discovery</td></tr><tr><td>Enhanced user experience through vocal context understanding</td><td>Interactive customer service scenarios</td></tr></tbody></table><h3 id="chained-architecture" tabindex="-1">Chained architecture <a class="header-anchor" href="#chained-architecture" aria-label="Permalink to &quot;Chained architecture&quot;">​</a></h3><p><img src="https://cdn.openai.com/API/docs/images/diagram-chained-agent.png" alt="Diagram of a chained agent architecture"></p><p>A chained architecture processes audio sequentially, converting audio to text, generating intelligent responses using large language models (LLMs), and synthesizing audio from text. We recommend this predictable architecture if you&#39;re new to building voice agents. Both the user input and model&#39;s response are in text, so you have a transcript and can control what happens in your application. It&#39;s also a reliable way to convert an existing LLM-based application into a voice agent.</p><p>You&#39;re chaining these models: <code>gpt-4o-transcribe</code> → <code>gpt-4.1</code> → <code>gpt-4o-mini-tts</code></p><table tabindex="0"><thead><tr><th>Strengths</th><th>Best for</th></tr></thead><tbody><tr><td>High control and transparency</td><td>Structured workflows focused on specific user objectives</td></tr><tr><td>Robust function calling and structured interactions</td><td>Customer support</td></tr><tr><td>Reliable, predictable responses</td><td>Sales and inbound triage</td></tr><tr><td>Support for extended conversational context</td><td>Scenarios that involve transcripts and scripted responses</td></tr></tbody></table><p>The following guide below is for building agents using our recommended <strong>speech-to-speech architecture</strong>.</p><p>To learn more about the chained architecture, see <a href="/docs/openai/guides/voice-agents?voice-agent-architecture=chained">the chained architecture guide</a>.</p><h2 id="build-a-voice-agent" tabindex="-1">Build a voice agent <a class="header-anchor" href="#build-a-voice-agent" aria-label="Permalink to &quot;Build a voice agent&quot;">​</a></h2><p>Use OpenAI&#39;s APIs and SDKs to create powerful, context-aware voice agents.</p><p>Building a speech-to-speech voice agent requires:</p><ol><li>Establishing a connection for realtime data transfer</li><li>Creating a realtime session with the Realtime API</li><li>Using an OpenAI model with realtime audio input and output capabilities</li></ol><p>To get started, read <a href="/docs/openai/guides/realtime">the Realtime API guide</a> and <a href="/docs/api-reference/realtime-sessions/create">the Realtime API reference</a>. Compatible models include <code>gpt-4o-realtime-preview</code> and <code>gpt-4o-mini-realtime-preview</code>.</p><p>If you want to get an idea of what interacting with a speech-to-speech voice agent looks like, check out the example below.</p><p>[</p><p>Realtime API Agents Demo</p><p>A collection of example speech-to-speech voice agents including handoffs and reasoning model validation.</p><p>](<a href="https://github.com/openai/openai-realtime-agents" target="_blank" rel="noreferrer">https://github.com/openai/openai-realtime-agents</a>)</p><h3 id="choose-your-transport-method" tabindex="-1">Choose your transport method <a class="header-anchor" href="#choose-your-transport-method" aria-label="Permalink to &quot;Choose your transport method&quot;">​</a></h3><p>As latency is critical in voice agent use cases, the Realtime API provides two low-latency transport methods:</p><ol><li><strong>WebRTC</strong>: A peer-to-peer protocol that allows for low-latency audio and video communication.</li><li><strong>WebSocket</strong>: A common protocol for realtime data transfer.</li></ol><p>The two transport methods for the Realtime API support largely the same capabilities, but which one is more suitable for you will depend on your use case.</p><p>WebRTC is generally the better choice if you are building client-side applications such as browser-based voice agents.</p><p>For anything where you are executing the agent server-side such as building an agent that can <a href="https://github.com/openai/openai-realtime-twilio-demo" target="_blank" rel="noreferrer">answer phone calls</a>, WebSockets will be the better option.</p><h3 id="design-your-voice-agent" tabindex="-1">Design your voice agent <a class="header-anchor" href="#design-your-voice-agent" aria-label="Permalink to &quot;Design your voice agent&quot;">​</a></h3><p>Just like when designing a text-based agent, you&#39;ll want to start small and keep your agent focused on a single task.</p><p>Try to limit the number of tools your agent has access to and provide an escape hatch for the agent to deal with tasks that it is not equipped to handle.</p><p>This could be a tool that allows the agent to handoff the conversation to a human or a certain phrase that it can fall back to.</p><p>While providing tools to text-based agents is a great way to provide additional context to the agent, for voice agents you should consider giving critical information as part of the prompt as opposed to requiring the agent to call a tool first.</p><p>If you are just getting started, check out our <a href="/playground/realtime">Realtime Playground</a> that provides prompt generation helpers, as well as a way to stub out your function tools including stubbed tool responses to try end to end flows.</p><h3 id="precisely-prompt-your-agent" tabindex="-1">Precisely prompt your agent <a class="header-anchor" href="#precisely-prompt-your-agent" aria-label="Permalink to &quot;Precisely prompt your agent&quot;">​</a></h3><p>With speech-to-speech agents, prompting is even more powerful than with text-based agents as the prompt allows you to not just control the content of the agent&#39;s response but also the way the agent speaks or help it understand audio content.</p><p>A good example of what a prompt might look like:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Personality and Tone</span></span>
<span class="line"><span>## Identity</span></span>
<span class="line"><span>// Who or what the AI represents (e.g., friendly teacher, formal advisor, helpful assistant). Be detailed and include specific details about their character or backstory.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Task</span></span>
<span class="line"><span>// At a high level, what is the agent expected to do? (e.g. &quot;you are an expert at accurately handling user returns&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Demeanor</span></span>
<span class="line"><span>// Overall attitude or disposition (e.g., patient, upbeat, serious, empathetic)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Tone</span></span>
<span class="line"><span>// Voice style (e.g., warm and conversational, polite and authoritative)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Level of Enthusiasm</span></span>
<span class="line"><span>// Degree of energy in responses (e.g., highly enthusiastic vs. calm and measured)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Level of Formality</span></span>
<span class="line"><span>// Casual vs. professional language (e.g., “Hey, great to see you!” vs. “Good afternoon, how may I assist you?”)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Level of Emotion</span></span>
<span class="line"><span>// How emotionally expressive or neutral the AI should be (e.g., compassionate vs. matter-of-fact)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Filler Words</span></span>
<span class="line"><span>// Helps make the agent more approachable, e.g. “um,” “uh,” &quot;hm,&quot; etc.. Options are generally &quot;none&quot;, &quot;occasionally&quot;, &quot;often&quot;, &quot;very often&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Pacing</span></span>
<span class="line"><span>// Rhythm and speed of delivery</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Other details</span></span>
<span class="line"><span>// Any other information that helps guide the personality or tone of the agent.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Instructions</span></span>
<span class="line"><span>- If a user provides a name or phone number, or something else where you ened to know the exact spelling, always repeat it back to the user to confrm you have the right understanding before proceeding. // Always include this</span></span>
<span class="line"><span>- If the caller corrects any detail, acknowledge the correction in a straightforward manner and confirm the new spelling or value.</span></span></code></pre></div><p>You do not have to be as detailed with your instructions. This is for illustrative purposes. For shorter examples, check out the prompts on <a href="https://openai.fm" target="_blank" rel="noreferrer">OpenAI.fm</a>.</p><p>For use cases with common conversation flows you can encode those inside the prompt using markup language like JSON</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Conversation States</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;1_greeting&quot;,</span></span>
<span class="line"><span>    &quot;description&quot;: &quot;Greet the caller and explain the verification process.&quot;,</span></span>
<span class="line"><span>    &quot;instructions&quot;: [</span></span>
<span class="line"><span>      &quot;Greet the caller warmly.&quot;,</span></span>
<span class="line"><span>      &quot;Inform them about the need to collect personal information for their record.&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;examples&quot;: [</span></span>
<span class="line"><span>      &quot;Good morning, this is the front desk administrator. I will assist you in verifying your details.&quot;,</span></span>
<span class="line"><span>      &quot;Let us proceed with the verification. May I kindly have your first name? Please spell it out letter by letter for clarity.&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;transitions&quot;: [{</span></span>
<span class="line"><span>      &quot;next_step&quot;: &quot;2_get_first_name&quot;,</span></span>
<span class="line"><span>      &quot;condition&quot;: &quot;After greeting is complete.&quot;</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;2_get_first_name&quot;,</span></span>
<span class="line"><span>    &quot;description&quot;: &quot;Ask for and confirm the caller&#39;s first name.&quot;,</span></span>
<span class="line"><span>    &quot;instructions&quot;: [</span></span>
<span class="line"><span>      &quot;Request: &#39;Could you please provide your first name?&#39;&quot;,</span></span>
<span class="line"><span>      &quot;Spell it out letter-by-letter back to the caller to confirm.&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;examples&quot;: [</span></span>
<span class="line"><span>      &quot;May I have your first name, please?&quot;,</span></span>
<span class="line"><span>      &quot;You spelled that as J-A-N-E, is that correct?&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;transitions&quot;: [{</span></span>
<span class="line"><span>      &quot;next_step&quot;: &quot;3_get_last_name&quot;,</span></span>
<span class="line"><span>      &quot;condition&quot;: &quot;Once first name is confirmed.&quot;</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;3_get_last_name&quot;,</span></span>
<span class="line"><span>    &quot;description&quot;: &quot;Ask for and confirm the caller&#39;s last name.&quot;,</span></span>
<span class="line"><span>    &quot;instructions&quot;: [</span></span>
<span class="line"><span>      &quot;Request: &#39;Thank you. Could you please provide your last name?&#39;&quot;,</span></span>
<span class="line"><span>      &quot;Spell it out letter-by-letter back to the caller to confirm.&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;examples&quot;: [</span></span>
<span class="line"><span>      &quot;And your last name, please?&quot;,</span></span>
<span class="line"><span>      &quot;Let me confirm: D-O-E, is that correct?&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;transitions&quot;: [{</span></span>
<span class="line"><span>      &quot;next_step&quot;: &quot;4_next_steps&quot;,</span></span>
<span class="line"><span>      &quot;condition&quot;: &quot;Once last name is confirmed.&quot;</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;4_next_steps&quot;,</span></span>
<span class="line"><span>    &quot;description&quot;: &quot;Attempt to verify the caller&#39;s information and proceed with next steps.&quot;,</span></span>
<span class="line"><span>    &quot;instructions&quot;: [</span></span>
<span class="line"><span>      &quot;Inform the caller that you will now attempt to verify their information.&quot;,</span></span>
<span class="line"><span>      &quot;Call the &#39;authenticateUser&#39; function with the provided details.&quot;,</span></span>
<span class="line"><span>      &quot;Once verification is complete, transfer the caller to the tourGuide agent for further assistance.&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;examples&quot;: [</span></span>
<span class="line"><span>      &quot;Thank you for providing your details. I will now verify your information.&quot;,</span></span>
<span class="line"><span>      &quot;Attempting to authenticate your information now.&quot;,</span></span>
<span class="line"><span>      &quot;I&#39;ll transfer you to our agent who can give you an overview of our facilities. Just to help demonstrate different agent personalities, she&#39;s instructed to act a little crabby.&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;transitions&quot;: [{</span></span>
<span class="line"><span>      &quot;next_step&quot;: &quot;transferAgents&quot;,</span></span>
<span class="line"><span>      &quot;condition&quot;: &quot;Once verification is complete, transfer to tourGuide agent.&quot;</span></span>
<span class="line"><span>    }]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>Instead of writing this out by hand, you can also check out this <a href="https://chatgpt.com/g/g-678865c9fb5c81918fa28699735dd08e-voice-agent-metaprompt-gpt" target="_blank" rel="noreferrer">Voice Agent Metaprompter</a> or <a href="https://github.com/openai/openai-realtime-agents/blob/main/src/app/agentConfigs/voiceAgentMetaprompt.txt" target="_blank" rel="noreferrer">copy the metaprompt</a> and use it directly.</p><h3 id="handle-agent-handoff" tabindex="-1">Handle agent handoff <a class="header-anchor" href="#handle-agent-handoff" aria-label="Permalink to &quot;Handle agent handoff&quot;">​</a></h3><p>In order to keep your agent focused on a single task, you can provide the agent with the ability to transfer or handoff to another specialized agent. You can do this by providing the agent with a function tool to initiate the transfer. This tool should have information on when to use it for a handoff. Here is an example of such a tool definition:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> tool</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;function&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  function: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;transferAgents&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Triggers a transfer of the user to a more specialized agent. </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Calls escalate to a more specialized LLM agent or to a human agent, with additional context. </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Only call this function if one of the available agents is appropriate. Don&#39;t transfer to your own agent type.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Let the user know you&#39;re about to transfer them before doing so.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Available Agents:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">- returns_agent</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">- product_specialist_agent</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  \`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">trim</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    parameters: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;object&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      properties: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        rationale_for_transfer: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;string&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;The reasoning why this transfer is needed.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        conversation_context: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;string&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          description:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;Relevant context from the conversation that will help the recipient perform the correct action.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        destination_agent: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;string&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          description:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;The more specialized destination_agent that should handle the user&#39;s intended request.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          enum: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;returns_agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;product_specialist_agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>Once the agent calls that tool you can then use the <code>session.update</code> event of the Realtime API to update the configuration of the session to use the instructions and tools available to the specialized agent.</p><h3 id="extend-your-agent-with-specialized-models" tabindex="-1">Extend your agent with specialized models <a class="header-anchor" href="#extend-your-agent-with-specialized-models" aria-label="Permalink to &quot;Extend your agent with specialized models&quot;">​</a></h3><p><img src="https://cdn.openai.com/API/docs/diagram-speech-to-speech-agent-tools.png" alt="Diagram showing the speech-to-speech model calling other agents as tools"></p><p>While the speech-to-speech model is useful for conversational use cases, there might be use cases where you need a specific model to handle the task like having o3 validate a return request against a detailed return policy.</p><p>In that case you can expose your text-based agent using your preferred model as a function tool call that your agent can send specific requests to.</p>`,63)]))}const g=s(i,[["render",o]]);export{u as __pageData,g as default};
