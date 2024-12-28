import { useEffect } from 'preact/hooks'

const clip_id = 'dyqmbzua57cc'
const config = {
  clip_id,
  transparent: 'true',
  pause: '0',
  repeat: '',
  bg_color: '#ffffff',
  fs_mode: '2',
  no_controls: '',
  start_img: '0',
  start_volume: '100',
  close_button: '',
  brand_new_window: '1',
  auto_hide: '',
  stretch_video: '',
  player_align: 'NONE',
  offset_x: '',
  offset_y: '',
  player_color_ratio: 0.6,
  skinAlpha: '50',
  colorBase: '#873362',
  colorIcon: '',
  colorHighlight: '#904e73',
  direct: 'false',
  is_responsive: 'true',
  viewers_limit: 0,
  cc_position: 'bottom',
  cc_positionOffset: 70,
  cc_multiplier: 0.03,
  cc_textColor: '#ffffff',
  cc_textOutlineColor: '#ffffff',
  cc_bkgColor: '#000000',
  cc_bkgAlpha: 0.7,
  aspect_ratio: '16:9',
  play_button: '0',
  play_button_style: 'pulsing',
  sleek_player: '0',
  auto_play: '0',
  auto_play_type: 'mute',
  floating_player: 'none',
}

const streamKey = 'svp_player' + clip_id

export default function Stream() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const svp_player = new SVPDynamicPlayer(
      streamKey,
      '',
      '100%',
      '100%',
      { use_div: streamKey, skin: '3' },
      config
    )

    svp_player.execute()
  }, [])

  return <div id={streamKey} className="relative w-96 h-full" />
}
