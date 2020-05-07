import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
	selector: 'app-user-playlists',
	templateUrl: './user-playlists.component.html',
	styleUrls: ['./user-playlists.component.css'],
})
export class UserPlaylistsComponent implements OnInit {
	isPlaying = false;
	idPlaying = -1;
	audio = new Audio();
	user: User;
	playlist: Array<any>;

	constructor() {}

	ngOnInit(): void {
		let localUser = JSON.parse(localStorage.getItem('user'));
		this.user = new User(
			localUser.id,
			localUser.email,
			localUser.username,
			localUser.password,
			localUser.dayOfBirth,
			localUser.monthOfBirth,
			localUser.yearOfBirth,
			localUser.gender
		);
		this.playlist = localUser.playlist;
	}

	playMusic(musicPath, index) {
		const icon = document.getElementsByClassName('play-pause-button');

		if (this.isPlaying) {
			this.audio.pause();
			this.isPlaying = false;
			icon[this.idPlaying]['src'] = '../../../assets/play.svg';
			this.idPlaying = -1;
		} else {
			this.audio = new Audio(musicPath);
			this.audio.play();
			this.isPlaying = true;
			this.idPlaying = index;
			icon[index]['src'] = '../../../assets/pause.svg';
		}
	}

	parseTime(time) {
		const min = Math.trunc(time / 60);
		const seg = time - min * 60;

		return `${min}:${String(seg).padStart(2, '0')}`;
	}
}
