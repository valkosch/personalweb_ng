export function startTerminal(){
    const fonts = ['Roman', 'S blood', 'ANSI Regular', 'Bloody', 'Delta Corps Priest 1', 'The Edge'];
    const font = ($(window).width() < 600)? 'The Edge' : fonts[Math.floor(Math.random() * 6)];

    figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts' });
    figlet.preloadFonts([font], ready);

    const root = '~';
    let cwd = root;
    let term;

    const directories = {
        education: [
            '',
            '[[;#fff;]education]',
            '* [[!;;;;https://www.vik.bme.hu/en/]Budapest University of Technology and Economics] [[;#55f;]Computer Science] 2023-',
            '* [[!;;;;https://leovey.hu/]Leovey Klara Gymnasium] 2019-2023',
            ''
        ],
        skills: [
            '',
        '[[;#fff;]languages]',

            [
                'C, C++, C#',
                'Java',
                'JavaScript',
                'Python',
                'SQL',
                'Bash'
            ].map(lang => `* [[;#0ff;]${lang}]`),
            '',
            '[[;#fff;]hard skills]',
            [
                'Computer networks, Cisco Devices',
                'Virtualization, Containerization, DevOps',
                'Penetration Testing',
                'Malware Analysis - high level',
                'Industrial Control System security'
            ].map(lib => `* [[;#0f0;]${lib}]`),
            '',
            '[[;#fff;]tools]',
            [
                'Proxmox',
                'Docker',
                'Kubernetes',
                'Wazuh',
                'Metasploit',
                'git',
                'GNU/Linux'
            ].map(lib => `* [[;#f00;]${lib}]`),
            ''
        ].flat(),
        projects: [
            '',
            '[[;#fff;]Latest pet projects]',
            `* [[!;;;;#]]Built my personal website, learned REST API, and OAuth2 flow`,
            `* [[!;;;;#]Built my own homelab]`,
            `* [[!;;;;#]Buit my own k8s cluster]`,
            `* [[!;;;;#]DHT network sniffer and torrent tracker scraper]`,
            `* [[!;;;;#]Computer graphics, built a raytracer]`,
            `* [[!;;;;#]CCTV network vulnerability, and RTSP fuzzing]`,
            `* [[!;;;;#]OT security, ICS risk management]`,
            `* [[!;;;;#]started malware analysis]`,
            `* [[!;;;;#]encrypted traffic analysis with IP flow exports and neural networks]`,
            `* [[!;;;;#]Binary visualiser`,
            '',
        ],
        experiences: [
            '',
            '[[;#fff;]experiences]',
            `* [[!;;;;https://securiteam.kszk.bme.hu]SecurITeam] - leading, being responsible for a small group of cybersecurity enthusiast students, organizing workshops`,
            `* [[!;;;;https://www.msg-plaut.com/hu]msg Plaut Hungary] - Cybersecurity Engineer | Penetration tester - 2025`,
            `* [[;#55f;]2025 HCSC] CTF championship, solid 25th out of 200 competitors`,
            `* [[;#55f;]Superior Pentest] HackTheBox like CTF competition, 4th out of 20 competitors, won a free ethical hacking course yey`,
            '',
        ]
    }
    function print_home() {
        term.echo(Object.keys(directories).map(dir => {
            return `[[;#55F;]${dir}]`;
        }).join('\n'));
    }

    const commands = {
        hello: function(what) {
            this.echo('Hello, ' + what +
                      '. Welcome to this terminal.');
        },
        help: function(){
            term.echo(`List of available commands: ${help}`, {raw: true});
        },
        echo: function(...args) {
            if(args.length > 0){
                term.echo(args.join(' '));
            }
        },
        cat: function() {
            term.echo('');
            term.echo($(`<img src="https://cataas.com/cat?width=200&height=200&nocache=${Math.random()}">`));
            term.echo('');
        },
        cd: function(dir = null) {
            const dirs = Object.keys(directories);
            if (dir === null || (dir === '..' && cwd !== root)) {
                cwd = root;
            } else if (dir.startsWith('~/') && dirs.includes(dir.substring(2))) {
                cwd = dir;
            } else if (dir.startsWith('../') && cwd !== root &&
                    dirs.includes(dir.substring(3))) {
                cwd = root + '/' + dir.substring(3);
            } else if (dirs.includes(dir)) {
                cwd = root + '/' + dir;
            } else {
                this.error('Wrong directory');
            }
        },
        ls: function(dir = null) {
            if (dir) {
                if (dir.match(/^~\/?$/)) {
                    // ls ~ or ls ~/
                    print_home();
                } else if (dir.startsWith('~/')) {
                    const path = dir.substring(2);
                    const dirs = path.split('/');
                    if (Object.keys(directories).length > 1) {
                        this.error('Invalid directory');
                    } else {
                        const dir = dirs[0];
                        this.echo(dirs[dir].join('\n'));
                    }
                } else if (cwd === root) {
                    if (dir in directories) {
                        this.echo(directories[dir].join('\n'));
                    } else {
                        this.error('Invalid directory');
                    }
                } else if (dir === '..') {
                    print_home();
                } else {
                    this.error('Invalid directory');
                }
            } else if (cwd === root) {
                print_home();
            } else {
                const dir = cwd.substring(2);
                this.echo(directories[dir].join('\n'));
            }
        },
        credits: function() {
            const credits = [
                '',
                'Used libraries',
                '* <a style="color:#55F;" href="https://terminal.jcubic.pl">jQuery Terminal</a>',
                '* <a style="color:#55F;" href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
                ''
            ].join('\n');
            this.echo(credits, {raw: true});
            
        },
        free: function(){
            term.echo('');
            this.echo($(
                '<a href="/images/loser.gif"><img src="images/88x31/Jesus-free-ps2.gif" alt="" width="150"></a>'
            ))
            term.echo('');
        }

    };
    const formatter = new Intl.ListFormat("en", {
        style: "long",
        type: "conjunction",
    });
    const command_list = ['clear'].concat(Object.keys(commands));
    const formatted_list = command_list.map(cmd => {
        return `<span class="command">${cmd}</span>`;
    });
    const help = formatter.format(formatted_list);
    const re = new RegExp(`^\s*(${command_list.join('|')})(\s?.*)`);

    $.terminal.new_formatter([re, function(_, command, args) {
         return `[[;white;]${command}][[;aqua;]${args}]`;
    }]);

    const user = 'guest';
    const server = 'v41k0.xyz';

    function prompt() {
        return `[[;#0f0;]${user}@${server}:][[;aqua;]${cwd}][[;#0f0;]$] `;
    }

    const options = {
        greetings: false,
        prompt,
        checkArity: false,
        exit: false,
        completion: true
    };

    term = $('#terminal').terminal(commands, options);
    term.on('click', '.command', function() {
        const command = $(this).text();
        term.exec(command);
    });
    function ready(){
        term.echo(() => render('valko'), { ansi: true });
        term.echo('[[b;#ff0;]\n!UNDER CONSTRUCTION!]')
        term.echo('Welcome to my profile, take a look around. For the available commands type ' + '[[b;#fff;]help]');
        term.echo('[[i;#772953;]my favorite is ][[b;#772953;]cat\n]');
    }
    
    function render(text) {
        const cols = term.cols();
        return figlet.textSync(text, {
            font: font,
            width: cols,
            whitespaceBreak: true
    });
}
};

