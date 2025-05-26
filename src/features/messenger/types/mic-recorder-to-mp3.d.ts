declare module 'mic-recorder-to-mp3' {
  export default class MicRecorder {
    constructor(config?: { bitRate?: number })

    start(): Promise<void>

    stop(): {
      getMp3(): Promise<[ArrayBuffer, Blob]>
    }
  }
}
