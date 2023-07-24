function skillsMember() {
    return {
        name: 'skillsMember',
        templateUrl: 'app/components/skills-member/skills-member.html',
        controller: SkillsMemberController,
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}