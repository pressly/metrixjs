// A list of enumerated events that we're able to track. We are very
// specific about we support, and warn for events we don't recognize
// to enforce a contract between what we track, what we collect and
// what we report.

// TODO ...

export const EVENTS = {
  BOO: 'boo',
  FOO: 'foo'
}

// hmm.. should we get strict about payloads too...? I kind of think so

class Event {

}
