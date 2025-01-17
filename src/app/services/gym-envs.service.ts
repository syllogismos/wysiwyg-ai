import { Injectable } from '@angular/core';

declare var $: any;
declare var _: any;
@Injectable()
export class GymEnvsService {

  constructor() { }


  getGymEnvIds(): Array<string> {
    return _.sortBy(_.map(this.gymEnvMetadata, x => x.id), x => x);
  }

  getGymEnvs(): Array<any> {
    return this.gymEnvMetadata
  }

  loadMetadata(): void {
    $.get('/assets/json/env_meta_data.json', data => this.gymEnvMetadataa = data)
  }

  getMetadataOfEnv(env_id: String): any {
    return _.find(this.gymEnvMetadata, x => x.id == env_id)
  }

  gymEnvMetadataa: any

  gymEnvMetadata = [
    {
      "id": "WizardOfWor-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "ReversedAddition-v0",
      "observation_space": "Discrete(4)",
      "action_space": "Tuple(Discrete(4), Discrete(2), Discrete(3))",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 25
    },
    {
      "id": "Alien-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Jamesbond-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "RoboschoolHalfCheetah-v1",
      "observation_space": "Box(26,)",
      "action_space": "Box(6,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 3000
    },
    {
      "id": "Hero-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AtlantisDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Centipede-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "AirRaid-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "RoadRunnerDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "ReversedAddition3-v0",
      "observation_space": "Discrete(4)",
      "action_space": "Tuple(Discrete(4), Discrete(2), Discrete(3))",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 25
    },
    /*{
      "id": "JamesbondNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PitfallDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Tutankham-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AlienDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Freeway-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "AlienNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Breakout-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Pooyan-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "RoadRunner-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Bowling-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "IceHockey-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Carnival-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Krull-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "NameThisGame-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "PrivateEye-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "IceHockey-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "MontezumaRevenge-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Solaris-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "YarsRevenge-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "VentureNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Freeway-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AssaultDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(7)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Jamesbond-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "BeamRider-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "QbertNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "IceHockeyDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Carnival-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Go19x19-v0",
      "observation_space": "Box(3, 19, 19)",
      "action_space": "Discrete(363)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    /*{
      "id": "NameThisGameNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "MountainCar-v0",
      "observation_space": "Box(2,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": -110
    },
    {
      "id": "Hero-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Enduro-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AsterixDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "IceHockey-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "SpaceInvadersNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 300000,
      "max_episode_steps": 300000,
      "reward_threshold": null
    },*/
    /*{
      "id": "DemonAttackNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Assault-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(7)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Riverraid-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Enduro-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "VideoPinball-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Enduro-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AsteroidsDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Hero-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "RoadRunner-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "SpaceInvaders-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Qbert-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "TutankhamDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Pendulum-v0",
      "observation_space": "Box(3,)",
      "action_space": "Box(1,)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    {
      "id": "Pooyan-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Seaquest-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BreakoutDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Boxing-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "KangarooDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "TennisNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "RoadRunnerDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Phoenix-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Gravitar-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AssaultDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(7)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "MontezumaRevengeNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Qbert-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "PongDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "JourneyEscapeNoFrameskip-v0",
      "observation_space": "Box(230, 160, 3)",
      "action_space": "Discrete(16)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Bowling-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Bowling-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "NameThisGameDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Robotank-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Centipede-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "ChopperCommandDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "SkiingDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Pong-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "BattleZone-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "YarsRevenge-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AmidarDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "BattleZone-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "PrivateEye-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Berzerk-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "PrivateEye-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Gravitar-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Bowling-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "UpNDownNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "WizardOfWor-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AmidarDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "DoubleDunk-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "StarGunnerDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AirRaid-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "TutankhamDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "BattleZone-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "KrullDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Krull-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "DemonAttack-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "JourneyEscape-v0",
      "observation_space": "Box(230, 160, 3)",
      "action_space": "Discrete(16)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "VideoPinballDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BankHeistNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "DuplicatedInput-v0",
      "observation_space": "Discrete(6)",
      "action_space": "Tuple(Discrete(2), Discrete(2), Discrete(5))",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 9
    },
    {
      "id": "RoboschoolHumanoidFlagrunHarder-v1",
      "observation_space": "Box(44,)",
      "action_space": "Box(17,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": null
    },
    /*{
      "id": "YarsRevengeDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PongDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Tutankham-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "DoubleDunkNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Berzerk-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "MontezumaRevenge-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "UpNDown-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Tutankham-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "PhoenixDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "RoboschoolReacher-v1",
      "observation_space": "Box(9,)",
      "action_space": "Box(2,)",
      "timestep_limit": 150,
      "max_episode_steps": 150,
      "reward_threshold": 18
    },
    {
      "id": "Amidar-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "PrivateEye-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "UpNDown-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "OneRoundNondeterministicReward-v0",
      "observation_space": "Discrete(1)",
      "action_space": "Discrete(2)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    /*{
      "id": "RoadRunnerNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Kangaroo-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "KungFuMasterDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Seaquest-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "BattleZone-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "BeamRider-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Qbert-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "FishingDerby-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "TimePilot-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "TennisDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PrivateEye-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "QbertNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Boxing-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "IceHockeyDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "BankHeist-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "PrivateEyeNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BeamRiderNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PongNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "RiverraidNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Hero-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Tutankham-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Berzerk-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "RoadRunner-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Pitfall-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Breakout-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "ZaxxonDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "MsPacman-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "FishingDerby-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Hero-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Krull-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "UpNDownDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Pitfall-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "BeamRider-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Qbert-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "QbertDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "CarnivalDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Asterix-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Boxing-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "YarsRevenge-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Centipede-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Amidar-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "RiverraidDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ElevatorAction-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "SpaceInvadersDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "SpaceInvaders-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 300000,
      "max_episode_steps": 300000,
      "reward_threshold": null
    },
    /*{
      "id": "SolarisNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Pooyan-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "StarGunner-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Freeway-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Blackjack-v0",
      "observation_space": "Tuple(Discrete(32), Discrete(11), Discrete(2))",
      "action_space": "Discrete(2)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    /*{
      "id": "CrazyClimber-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ElevatorActionDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "VideoPinball-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "TutankhamNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "ChopperCommand-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "MsPacman-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Alien-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Pooyan-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Hero-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "ElevatorAction-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "IceHockey-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Pitfall-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "DemonAttack-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "CrazyClimberNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Tennis-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "GopherDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "DoubleDunkNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "ChopperCommand-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "EnduroNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Pitfall-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Riverraid-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "RoboschoolWalker2d-v1",
      "observation_space": "Box(22,)",
      "action_space": "Box(6,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 2500
    },
    {
      "id": "Hero-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "DoubleDunk-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "MontezumaRevenge-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "QbertDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Frostbite-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Asteroids-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "BankHeistNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Jamesbond-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Venture-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Tutankham-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "BankHeist-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "EnduroNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "DemonAttack-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "MsPacman-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Berzerk-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AsterixNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "VideoPinball-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Solaris-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "CrazyClimberDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Frostbite-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "FrostbiteDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Gravitar-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "RobotankNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "BeamRider-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "MsPacman-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "AirRaidNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Gravitar-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "BerzerkDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "SemisuperPendulumDecay-v0",
      "observation_space": "Box(3,)",
      "action_space": "Box(1,)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    /*{
      "id": "FrostbiteDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Atlantis-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "AirRaid-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AsterixDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "WizardOfWor-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "RiverraidNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "GopherNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BeamRiderNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Pitfall-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "FishingDerby-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Breakout-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "RoboschoolHumanoid-v1",
      "observation_space": "Box(44,)",
      "action_space": "Box(17,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 3500
    },
    {
      "id": "Qbert-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "NameThisGame-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Assault-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(7)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Alien-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "GuessingGame-v0",
      "observation_space": "Discrete(4)",
      "action_space": "Box(1,)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    {
      "id": "KungFuMaster-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "Bowling-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "ElevatorAction-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Kangaroo-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "FishingDerbyNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ZaxxonNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AtlantisDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Frostbite-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "TwoRoundNondeterministicReward-v0",
      "observation_space": "Discrete(3)",
      "action_space": "Discrete(2)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    {
      "id": "Asterix-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Kangaroo-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Skiing-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Boxing-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Frostbite-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "RoadRunnerNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "RoboschoolInvertedPendulum-v1",
      "observation_space": "Box(5,)",
      "action_space": "Box(1,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 950
    },
    /*{
      "id": "CrazyClimberDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "CrazyClimber-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "FishingDerbyDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BattleZoneDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Asteroids-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "VideoPinballNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "IceHockey-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Qbert-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "RoboschoolHopper-v1",
      "observation_space": "Box(15,)",
      "action_space": "Box(3,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 2500
    },
    {
      "id": "Robotank-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "PitfallNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Seaquest-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "AssaultNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(7)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "CentipedeNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Zaxxon-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Amidar-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "YarsRevengeNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "FreewayDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "TimePilotDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Pitfall-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "StarGunner-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "UpNDown-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "NameThisGame-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "RoboschoolAnt-v1",
      "observation_space": "Box(28,)",
      "action_space": "Box(8,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 2500
    },
    /*{
      "id": "CarnivalDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "FishingDerby-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Gopher-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "BankHeist-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "SpaceInvaders-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "TennisNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Venture-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Breakout-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Skiing-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Phoenix-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "AirRaidDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Phoenix-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "SolarisNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AirRaidNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BoxingDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "KungFuMaster-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Solaris-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BoxingDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "DemonAttackDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "JourneyEscape-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(16)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "OffSwitchCartpoleProb-v0",
      "observation_space": "Tuple(Discrete(2), Box(4,))",
      "action_space": "Discrete(2)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    /*{
      "id": "BreakoutNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Kangaroo-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Robotank-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "UpNDown-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Go9x9-v0",
      "observation_space": "Box(3, 9, 9)",
      "action_space": "Discrete(83)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    /*{
      "id": "StarGunner-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "SemisuperPendulumRandom-v0",
      "observation_space": "Box(3,)",
      "action_space": "Box(1,)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    /*{
      "id": "Qbert-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Frostbite-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Kangaroo-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AlienNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "DoubleDunk-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "AirRaid-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "TimePilotNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Seaquest-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Assault-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(7)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Asteroids-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "RobotankDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Riverraid-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Pong-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Roulette-v0",
      "observation_space": "Discrete(1)",
      "action_space": "Discrete(38)",
      "timestep_limit": 100,
      "max_episode_steps": 100,
      "reward_threshold": null
    },
    {
      "id": "FishingDerby-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Venture-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "DemonAttackNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "KungFuMasterDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PhoenixNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "CrazyClimber-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Gopher-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Berzerk-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Centipede-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "BreakoutDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "KellyCoinflipGeneralized-v0",
      "observation_space": "Tuple(Box(1,), Discrete(280), Discrete(280), Discrete(280), Box(1,))",
      "action_space": "Discrete(20300)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    {
      "id": "Venture-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "VideoPinball-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Krull-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Robotank-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Asterix-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "YarsRevenge-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "SeaquestNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "KungFuMaster-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "DemonAttack-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "GopherDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Krull-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "SeaquestDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "HeroDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "RiverraidDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "YarsRevengeNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Riverraid-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "HotterColder-v0",
      "observation_space": "Discrete(4)",
      "action_space": "Box(1,)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    {
      "id": "Jamesbond-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Venture-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "RoboschoolPong-v1",
      "observation_space": "Box(13,)",
      "action_space": "Box(2,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": null
    },
    {
      "id": "WizardOfWor-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Atlantis-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "JamesbondDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BankHeistDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BowlingDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "WizardOfWorNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Pong-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "KungFuMasterNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Gopher-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Assault-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(7)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "Gopher-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Amidar-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "WizardOfWor-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "DoubleDunk-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "OffSwitchCartpole-v0",
      "observation_space": "Tuple(Discrete(2), Box(4,))",
      "action_space": "Discrete(2)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    {
      "id": "AirRaid-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "RobotankDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "GravitarDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Hero-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "DoubleDunk-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "HeroNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Asterix-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Centipede-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Enduro-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "JourneyEscape-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(16)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "PitfallDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AtlantisNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "PrivateEye-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "KungFuMaster-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "YarsRevengeDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "VentureDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "NameThisGame-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "WizardOfWor-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "JourneyEscape-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(16)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Frostbite-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "SpaceInvaders-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "RobotankNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Zaxxon-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "SpaceInvaders-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "RoboschoolAtlasForwardWalk-v1",
      "observation_space": "Box(70,)",
      "action_space": "Box(30,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": null
    },
    /*{
      "id": "ChopperCommandNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "ElevatorAction-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "CarnivalNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "CarnivalNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Hex9x9-v0",
      "observation_space": "Box(3, 9, 9)",
      "action_space": "Discrete(82)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    /*{
      "id": "AsteroidsNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "FrostbiteNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "AirRaid-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "JamesbondDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "StarGunner-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Amidar-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Breakout-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "DemonAttack-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Skiing-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "BankHeist-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "ChopperCommandDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Jamesbond-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "RoboschoolHumanoidFlagrun-v1",
      "observation_space": "Box(44,)",
      "action_space": "Box(17,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 2000
    },
    {
      "id": "Centipede-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "BowlingNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Amidar-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Atlantis-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Robotank-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Pooyan-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "VideoPinballDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Riverraid-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Tennis-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ElevatorActionDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Carnival-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Zaxxon-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "RoadRunner-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Kangaroo-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "KrullNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "MsPacmanDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "PredictObsCartpole-v0",
      "observation_space": "Box(4,)",
      "action_space": "Tuple(Discrete(2), Box(4,), Box(4,), Box(4,), Box(4,), Box(4,))",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    {
      "id": "DoubleDunk-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "UpNDown-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "VideoPinball-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Enduro-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "BattleZone-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "DoubleDunk-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Bowling-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "CrazyClimberNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "MontezumaRevengeNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "CrazyClimber-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "IceHockey-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Zaxxon-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "VideoPinball-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "TennisDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "IceHockey-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Asterix-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Pooyan-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "BankHeist-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "FishingDerbyDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "DoubleDunkDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "CrazyClimber-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Enduro-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "CrazyClimber-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Pong-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Alien-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "DemonAttack-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Tutankham-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "KungFuMaster-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "TimePilotDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Boxing-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Assault-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(7)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Freeway-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "SolarisDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Carnival-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "CentipedeDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "EnduroDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Freeway-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Frostbite-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Seaquest-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Tennis-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Asterix-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Berzerk-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Riverraid-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Carnival-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "TimePilot-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Kangaroo-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "TimePilot-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "WizardOfWorDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Frostbite-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Skiing-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Atlantis-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "FishingDerbyNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "StarGunnerNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "YarsRevenge-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "BeamRiderDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "KungFuMaster-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Atlantis-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Reverse-v0",
      "observation_space": "Discrete(3)",
      "action_space": "Tuple(Discrete(2), Discrete(2), Discrete(2))",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 25
    },
    {
      "id": "Pong-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Pitfall-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "BeamRider-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "BeamRider-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Asteroids-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "SemisuperPendulumNoise-v0",
      "observation_space": "Box(3,)",
      "action_space": "Box(1,)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    /*{
      "id": "GravitarNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "JourneyEscape-v4",
      "observation_space": "Box(230, 160, 3)",
      "action_space": "Discrete(16)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Robotank-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "RoadRunner-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "CentipedeNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Solaris-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AtlantisNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AlienDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "RoboschoolInvertedDoublePendulum-v1",
      "observation_space": "Box(9,)",
      "action_space": "Box(1,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 9100
    },
    {
      "id": "Skiing-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "NameThisGameNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BattleZoneNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Tennis-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "PooyanNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Krull-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "BattleZone-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "CrazyClimber-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "TimePilot-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Gravitar-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "VentureDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Gopher-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "TimePilotNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "CartPole-v1",
      "observation_space": "Box(4,)",
      "action_space": "Discrete(2)",
      "timestep_limit": 500,
      "max_episode_steps": 500,
      "reward_threshold": 475
    },
    /*{
      "id": "HeroDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Gravitar-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Tennis-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "NameThisGameDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Gopher-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "VentureNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BowlingNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Pong-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Riverraid-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "ElevatorAction-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "BankHeistDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "TimePilot-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "VideoPinball-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "FishingDerby-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "KrullNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Pong-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Boxing-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "MsPacmanDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Asteroids-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "CrazyClimber-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Solaris-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "YarsRevenge-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "FishingDerby-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AsteroidsDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PrivateEyeNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BoxingNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Qbert-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "AirRaid-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "IceHockeyNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Alien-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Solaris-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Alien-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Amidar-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Asteroids-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "StarGunner-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "FishingDerby-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Venture-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "SolarisDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Asteroids-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "SkiingDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "WizardOfWorNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Jamesbond-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "DemonAttackDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ElevatorAction-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "StarGunner-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "FreewayDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PitfallNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Tennis-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "MountainCarContinuous-v0",
      "observation_space": "Box(2,)",
      "action_space": "Box(1,)",
      "timestep_limit": 999,
      "max_episode_steps": 999,
      "reward_threshold": 90
    },
    {
      "id": "RepeatCopy-v0",
      "observation_space": "Discrete(6)",
      "action_space": "Tuple(Discrete(2), Discrete(2), Discrete(5))",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 75
    },
    {
      "id": "Enduro-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Jamesbond-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "MsPacmanNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "TutankhamNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "FrozenLake-v0",
      "observation_space": "Discrete(16)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100,
      "max_episode_steps": 100,
      "reward_threshold": 0.78
    },
    {
      "id": "ElevatorAction-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "BerzerkDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "KellyCoinflip-v0",
      "observation_space": "Tuple(Box(1,), Discrete(301))",
      "action_space": "Discrete(25000)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": 246.61
    },
    /*{
      "id": "AsterixNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Berzerk-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "EnduroDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "RoadRunner-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "DemonAttack-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "SpaceInvaders-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "DoubleDunkDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "FreewayNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Freeway-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "UpNDown-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "StarGunner-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "PongNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Boxing-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "ChopperCommand-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "ChopperCommand-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "CentipedeDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "NameThisGame-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "PrivateEye-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "GravitarNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "CliffWalking-v0",
      "observation_space": "Discrete(48)",
      "action_space": "Discrete(4)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    /*{
      "id": "YarsRevenge-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Robotank-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Bowling-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Carnival-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Tutankham-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "NameThisGame-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "WizardOfWorDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Seaquest-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "StarGunnerNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "RoadRunner-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Skiing-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "MontezumaRevenge-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "YarsRevenge-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "KangarooNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Zaxxon-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Asteroids-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "SpaceInvadersNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 300000,
      "max_episode_steps": 300000,
      "reward_threshold": null
    },*/
    {
      "id": "AirRaid-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "PhoenixDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "JamesbondNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Solaris-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "UpNDownNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Freeway-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "NChain-v0",
      "observation_space": "Discrete(5)",
      "action_space": "Discrete(2)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": null
    },
    {
      "id": "BeamRider-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Enduro-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "VideoPinball-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "MsPacman-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ZaxxonDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "StarGunner-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Berzerk-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "UpNDownDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "JourneyEscape-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(16)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "JourneyEscapeDeterministic-v4",
      "observation_space": "Box(230, 160, 3)",
      "action_space": "Discrete(16)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PrivateEyeDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Atlantis-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Krull-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Robotank-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "SeaquestDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AmidarNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Pooyan-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "Riverraid-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "FrozenLake8x8-v0",
      "observation_space": "Discrete(64)",
      "action_space": "Discrete(4)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 0.99
    },
    /*{
      "id": "KungFuMasterNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PooyanDeterministic-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Asterix-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "MontezumaRevenge-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "TimePilot-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Gopher-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Jamesbond-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Atlantis-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "KrullDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Seaquest-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Phoenix-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Assault-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(7)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "ElevatorActionNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BreakoutNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "OneRoundDeterministicReward-v0",
      "observation_space": "Discrete(1)",
      "action_space": "Discrete(2)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    /*{
      "id": "AsteroidsNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(14)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "MsPacman-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Atlantis-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "JourneyEscapeNoFrameskip-v4",
      "observation_space": "Box(230, 160, 3)",
      "action_space": "Discrete(16)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BerzerkNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "StarGunnerDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Acrobot-v1",
      "observation_space": "Box(6,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 500,
      "max_episode_steps": 500,
      "reward_threshold": null
    },
    /*{
      "id": "VideoPinballNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Phoenix-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "WizardOfWor-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "SkiingNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "MontezumaRevengeDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PooyanDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Breakout-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "PredictActionsCartpole-v0",
      "observation_space": "Box(4,)",
      "action_space": "Tuple(Discrete(2), Discrete(2), Discrete(2), Discrete(2), Discrete(2), Discrete(2))",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": null
    },
    /*{
      "id": "MontezumaRevengeDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "MontezumaRevenge-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "ZaxxonNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Tennis-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Taxi-v2",
      "observation_space": "Discrete(500)",
      "action_space": "Discrete(6)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 8
    },
    /*{
      "id": "Gravitar-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "PrivateEye-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "MontezumaRevenge-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Tutankham-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "TimePilot-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Gopher-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Alien-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "Bowling-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "Solaris-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Centipede-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "MsPacman-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Phoenix-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Zaxxon-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "BattleZoneNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "GravitarDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BankHeist-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BowlingDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Zaxxon-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "Kangaroo-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "WizardOfWor-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Breakout-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(4)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ChopperCommand-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "Breakout-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(4)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "HeroNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Boxing-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "BeamRiderDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Phoenix-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "TwoRoundDeterministicReward-v0",
      "observation_space": "Discrete(3)",
      "action_space": "Discrete(2)",
      "timestep_limit": null,
      "max_episode_steps": null,
      "reward_threshold": null
    },
    {
      "id": "UpNDown-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "PrivateEyeDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "SpaceInvaders-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 300000,
      "max_episode_steps": 300000,
      "reward_threshold": null
    },
    {
      "id": "Amidar-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "BerzerkNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "NameThisGame-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "KungFuMaster-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "FrostbiteNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "RoadRunner-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "RoboschoolInvertedPendulumSwingup-v1",
      "observation_space": "Box(5,)",
      "action_space": "Box(1,)",
      "timestep_limit": 1000,
      "max_episode_steps": 1000,
      "reward_threshold": 800
    },
    {
      "id": "Carnival-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "MontezumaRevenge-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "BattleZone-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "ChopperCommand-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "SpaceInvaders-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    {
      "id": "KungFuMaster-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(14)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "Assault-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(7)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "AmidarNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Tennis-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "BeamRider-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "KangarooDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "MsPacman-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "JourneyEscape-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(16)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Skiing-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "ChopperCommand-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Gravitar-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "AssaultNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(7)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PhoenixNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Zaxxon-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "ChopperCommand-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BoxingNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "MsPacmanNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "Pooyan-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ElevatorActionNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "BankHeist-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Pong-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "SkiingNoFrameskip-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "DoubleDunk-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Pitfall-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "ChopperCommandNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "BattleZone-ram-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },
    /*{
      "id": "FreewayNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(3)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "IceHockeyNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "TimePilot-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(10)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Alien-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    /*{
      "id": "BankHeist-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "JourneyEscape-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(16)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Copy-v0",
      "observation_space": "Discrete(6)",
      "action_space": "Tuple(Discrete(2), Discrete(2), Discrete(5))",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 25
    },
    /*{
      "id": "BattleZoneDeterministic-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    {
      "id": "ElevatorAction-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Centipede-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "IceHockey-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Freeway-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Venture-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "GopherNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(8)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "CartPole-v0",
      "observation_space": "Box(4,)",
      "action_space": "Discrete(2)",
      "timestep_limit": 200,
      "max_episode_steps": 200,
      "reward_threshold": 195
    },
    /*{
      "id": "KangarooNoFrameskip-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "DemonAttack-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Phoenix-ramDeterministic-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(8)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Skiing-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(3)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    {
      "id": "Assault-ramNoFrameskip-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(7)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "Krull-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "SeaquestNoFrameskip-v4",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(18)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    /*{
      "id": "JourneyEscapeDeterministic-v0",
      "observation_space": "Box(230, 160, 3)",
      "action_space": "Discrete(16)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "SpaceInvadersDeterministic-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    /*{
      "id": "PooyanNoFrameskip-v0",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },*/
    {
      "id": "Carnival-ram-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Seaquest-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Venture-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(18)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    /*{
      "id": "UpNDown-v0",
      "observation_space": "Box(210, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 10000,
      "max_episode_steps": 10000,
      "reward_threshold": null
    },*/
    {
      "id": "NameThisGame-ramDeterministic-v4",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },
    {
      "id": "Asterix-ramNoFrameskip-v0",
      "observation_space": "Box(128,)",
      "action_space": "Discrete(9)",
      "timestep_limit": 400000,
      "max_episode_steps": 400000,
      "reward_threshold": null
    },
    /*{
      "id": "AirRaidDeterministic-v4",
      "observation_space": "Box(250, 160, 3)",
      "action_space": "Discrete(6)",
      "timestep_limit": 100000,
      "max_episode_steps": 100000,
      "reward_threshold": null
    },*/
    { "id": "LunarLander-v2", "observation_space": "Box(8,)", "action_space": "Discrete(4)", "timestep_limit": 1000, "max_episode_steps": 1000, "reward_threshold": 200 },
    { "id": "LunarLanderContinuous-v2", "observation_space": "Box(8,)", "action_space": "Box(2,)", "timestep_limit": 1000, "max_episode_steps": 1000, "reward_threshold": 200 },
    { "id": "BipedalWalker-v2", "observation_space": "Box(24,)", "action_space": "Box(4,)", "timestep_limit": 1600, "max_episode_steps": 1600, "reward_threshold": 300 },
    { "id": "BipedalWalkerHardcore-v2", "observation_space": "Box(24,)", "action_space": "Box(4,)", "timestep_limit": 2000, "max_episode_steps": 2000, "reward_threshold": 300 },
    // { "id": "CarRacing-v0", "observation_space": "Box(96, 96, 3)", "action_space": "Box(3,)", "timestep_limit": 1000, "max_episode_steps": 1000, "reward_threshold": 900 }
  ]
  
  

}
