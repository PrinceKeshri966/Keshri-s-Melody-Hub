// script.js

class Node {
    constructor(track) {
        this.track = track;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
    }

    addTrack(track) {
        const newNode = new Node(track);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    deleteLastTrack() {
        if (!this.tail) return; // If there is no track to delete

        const track = this.tail.track; // Track to delete

        if (this.head === this.tail) { // Only one track in the list
            this.head = null;
            this.tail = null;
            this.current = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
            if (this.current === this.tail.next) {
                this.current = this.tail;
            }
        }
        return track;
    }

    getCurrentTrack() {
        return this.current ? this.current.track : null;
    }

    nextTrack() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
        }
    }

    prevTrack() {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
        }
    }
}

const playlist = new DoublyLinkedList();
const audioPlayer = document.getElementById('audioPlayer');
const currentTrackDisplay = document.getElementById('currentTrack');
const playlistElement = document.getElementById('playlist');

function updatePlayer() {
    const currentTrack = playlist.getCurrentTrack();
    if (currentTrack) {
        audioPlayer.src = currentTrack.src;
        currentTrackDisplay.innerText = `Now Playing: ${currentTrack.title}`;
        audioPlayer.play();
    } else {
        audioPlayer.src = '';
        currentTrackDisplay.innerText = '';
    }
}

function addTrackToPlaylist(track) {
    const listItem = document.createElement('li');
    listItem.innerHTML = track.title;
    playlistElement.appendChild(listItem);
}

document.getElementById('nextButton').addEventListener('click', () => {
    playlist.nextTrack();
    updatePlayer();
});

document.getElementById('prevButton').addEventListener('click', () => {
    playlist.prevTrack();
    updatePlayer();
});

document.getElementById('addButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const track = {
            title: file.name,
            src: URL.createObjectURL(file)
        };
        playlist.addTrack(track);
        addTrackToPlaylist(track);
    }
    updatePlayer(); // Ensure player updates when new track is added
});

document.getElementById('deleteButton').addEventListener('click', () => {
    const lastTrack = playlist.deleteLastTrack();
    if (lastTrack) {
        const items = playlistElement.querySelectorAll('li');
        if (items.length > 0) {
            playlistElement.removeChild(items[items.length - 1]);
        }
        updatePlayer(); // Ensure player updates when a track is deleted
    }
});

// Initialize the player with the first track (if any)
updatePlayer();
